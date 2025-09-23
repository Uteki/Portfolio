import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AnimationService} from "../../animation.service";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  http = inject(HttpClient);

  showCheckboxError = false;
  mailTest = true;

  contactData = {
    name : "",
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

  constructor(private animationService: AnimationService) {}

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
            this.clearButtonAnimation(); ngForm.resetForm()
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.clearButtonAnimation(); ngForm.resetForm()
    }
  }

  checkForm(form: NgForm, hover: boolean) {
    const errorColorClass = 'error-placeholder';

    const fields = [
      { control: 'name', input: this.nameInput, default: 'Your name goes here', error: 'Oops! it seems your name is missing' },
      { control: 'email', input: this.emailInput, default: 'youremail@email.com', error: 'Hoppla! your email is required', type: 'email' },
      { control: 'message', input: this.messageInput, default: 'Hello Daniel, I am interested in...', error: 'What do you need to develop?' },
      { control: 'subscribe', input: this.subscribeInput, default: '', error: 'You must agree to the privacy policy', type: 'checkbox' }
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
  }

  hoverMiddle(isHovering: boolean) {
    const labels = document.querySelectorAll('form label') as NodeListOf<HTMLElement>;
    if (labels.length < 3) return;

    labels[0].style.borderBottom = isHovering ? '0' : '';
    labels[1].style.borderTop = isHovering ? '1px solid #3DCFB6' : '';
    labels[1].style.borderBottom = isHovering ? '1px solid #3DCFB6' : '';
    labels[2].style.borderTop = isHovering ? '0' : '';
  }
}
