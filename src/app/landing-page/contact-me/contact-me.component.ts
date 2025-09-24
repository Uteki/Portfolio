import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AnimationService } from "../../animation.service";
import { RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {ContactService} from "../../contact.service";

interface FormField {
  input: ElementRef<any>;
  default: string;
  error: string;
  type?: 'email' | 'checkbox';
  control: string;
}

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, AfterViewInit {
  http = inject(HttpClient);
  message: string = '';

  showCheckboxError = false;
  mailTest = true;

  placeholders: any = {};
  errors: any = {};

  contactData = {
    name: "",
    email: "",
    message: ""
  }

  post = {
    endPoint: 'https://daniel-tran.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('subscribeInput') subscribeInput!: ElementRef<HTMLInputElement>;

  constructor(
    private animationService: AnimationService,
    private translate: TranslateService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.loadTranslations();

    const saved = this.contactService.getData();
    this.contactData = {
      name: saved.name,
      email: saved.email,
      message: saved.message
    };
    this.message = saved.message;

    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  onInputChange() {
    this.contactService.setData({
      name: this.contactData.name,
      email: this.contactData.email,
      message: this.message
    });
  }

  onMessageChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
    this.onInputChange();
  }

  ngAfterViewInit() {
    const saved = this.contactService.getData();
    this.contactData = {
      name: saved.name,
      email: saved.email,
      message: saved.message
    };
    this.message = saved.message;

    if (this.messageInput && saved.messageHeight) {
      this.messageInput.nativeElement.style.height = saved.messageHeight;
    }
  }

  loadTranslations() { // added
    const keys = [
      'CONTACT.NAME_PLACEHOLDER',
      'CONTACT.EMAIL_PLACEHOLDER',
      'CONTACT.MESSAGE_PLACEHOLDER',
      'CONTACT.NAME_ERROR',
      'CONTACT.EMAIL_ERROR',
      'CONTACT.MESSAGE_ERROR',
      'CONTACT.TERMS_ERROR'
    ];

    this.translate.get(keys).subscribe(translations => {
      this.placeholders = {
        name: translations['CONTACT.NAME_PLACEHOLDER'],
        email: translations['CONTACT.EMAIL_PLACEHOLDER'],
        message: translations['CONTACT.MESSAGE_PLACEHOLDER']
      };

      this.errors = {
        name: translations['CONTACT.NAME_ERROR'],
        email: translations['CONTACT.EMAIL_ERROR'],
        message: translations['CONTACT.MESSAGE_ERROR'],
        checkbox: translations['CONTACT.TERMS_ERROR']
      };

      if (this.nameInput) this.nameInput.nativeElement.placeholder = this.placeholders.name;
      if (this.emailInput) this.emailInput.nativeElement.placeholder = this.placeholders.email;
      if (this.messageInput) this.messageInput.nativeElement.placeholder = this.placeholders.message;
    });
  }

  private updateField(field: { control: string; input: any; default: string; error: string }, isError: boolean, errorClass: string) {
    const el = field.input.nativeElement;
    el.placeholder = isError ? field.error : field.default;
    el.classList.toggle(errorClass, isError);

    if (isError && field.control === 'email') el.value = '';
  }

  private isFieldError(field: { control: string; input: any; type?: string }, form: NgForm, hover: boolean): boolean {
    if (!hover) return false;

    let invalid = form.controls[field.control]?.invalid;

    if (field.type === 'email' && field.input.nativeElement.value) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      invalid ||= !pattern.test(field.input.nativeElement.value);
    }
    if (field.type === 'checkbox') {
      invalid ||= !field.input.nativeElement.checked;
      this.showCheckboxError = invalid;
    }
    return !!invalid;
  }

  private clearButtonAnimation() {
    const button = document.querySelector('form button');
    if (!button) return;

    const span = button.querySelector('span');
    if (span) {
      span.style.animation = 'none';
      setTimeout(() => span.style.animation = '', 0);
    }
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.contactService.clearData(); this.clearButtonAnimation(); ngForm.resetForm()
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.contactService.clearData(); this.clearButtonAnimation(); ngForm.resetForm();
    }
  }

  checkForm(form: NgForm, hover: boolean) {
    const errorColorClass = 'error-placeholder';

    const fields: FormField[] = [
      { input: this.nameInput, default: this.placeholders.name, error: this.errors.name, control: 'name' },
      { input: this.emailInput, default: this.placeholders.email, error: this.errors.email, type: 'email', control: 'email' },
      { input: this.messageInput, default: this.placeholders.message, error: this.errors.message, control: 'message' },
      { input: this.subscribeInput, default: '', error: this.errors.checkbox, type: 'checkbox', control: 'subscribe' }
    ];

    fields.forEach(field => {
      const isError = this.isFieldError(field, form, hover);
      this.updateField(field, isError, errorColorClass);
    });
  }

  clearCheckboxError() {
    const checkbox = this.subscribeInput.nativeElement as HTMLInputElement;
    if (checkbox.checked) {
      this.showCheckboxError = false;
    }
  }

  onHover(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const targetBtn = event.target as HTMLButtonElement;

    if (targetBtn.disabled) return;

    this.animationService.startMarqueeBtnAnimation(target);
  }

  onHoverOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const targetBtn = event.target as HTMLButtonElement;

    if (targetBtn.disabled) return;

    this.animationService.returnMarqueeBtnToCenter(target);
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";

    this.contactService.setData({ messageHeight: `${textarea.scrollHeight}px` });
  }

  hoverMiddle(isHovering: boolean) {
    const labels = document.querySelectorAll('form label') as NodeListOf<HTMLElement>;
    if (labels.length < 3) return;

    labels[0].style.borderBottom = isHovering ? '0' : '';
    labels[1].style.borderTop = isHovering ? '1px solid #3DCFB6' : '';
    labels[1].style.borderBottom = isHovering ? '1px solid #3DCFB6' : '';
    labels[2].style.borderTop = isHovering ? '0' : '';
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
