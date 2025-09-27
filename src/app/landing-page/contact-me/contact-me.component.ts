import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AnimationService } from "../../animation.service";
import { RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {ContactData, ContactService} from "../../contact.service";

/**
 * Interface representing a form field for validation and animation purposes.
 */
interface FormField {
  /** Reference to the input/textarea/checkbox element */
  input: ElementRef<any>;
  /** Default placeholder text */
  default: string;
  /** Error placeholder text */
  error: string;
  /** Optional type for email or checkbox fields */
  type?: 'email' | 'checkbox';
  /** Control name in the NgForm */
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
/**
 * ContactMeComponent
 *
 * Standalone Angular component for the contact form.
 *
 * Features:
 * - Reactive placeholder and error messages via TranslateService.
 * - Auto-saving and restoring form data via ContactService.
 * - Smooth textarea auto-grow for the message field.
 * - Hover animations on form buttons via AnimationService.
 * - Form validation including email pattern and checkbox agreement.
 * - Smooth scrolling to top or other page sections.
 */
export class ContactMeComponent implements OnInit, AfterViewInit {
  /** HttpClient instance injected via Angular inject() */
  http: HttpClient = inject(HttpClient);

  /** Current message text */
  message: string = '';

  /** Controls visibility of the success message after sending */
  successMessageVisible: boolean = false;
  successMessageHide: boolean = false;

  /** Flag to show/hide checkbox error message */
  showCheckboxError: boolean = false;

  /** Testing flag for email sending simulation */
  mailTest: boolean = true;

  /** Placeholders for form inputs */
  placeholders: any = {};

  /** Error messages for form inputs */
  errors: any = {};

  /** Data object bound to the contact form */
  contactData = {
    name: "",
    email: "",
    message: ""
  }

  /** Configuration for sending form POST requests */
  post = {
    endPoint: 'https://daniel-tran.com/sendMail.php',
    body: (payload: any): string => JSON.stringify(payload),
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

  /** Initializes translations and loads saved form data */
  ngOnInit(): void {
    this.loadTranslations();
    const saved: ContactData = this.contactService.getData();
    this.contactData = {
      name: saved.name,
      email: saved.email,
      message: saved.message
    };
    this.message = saved.message;

    this.translate.onLangChange.subscribe((): void => {
      this.loadTranslations();
    });
  }

  /** Sets up initial values and restores message height after view init */
  ngAfterViewInit(): void {
    const saved: ContactData = this.contactService.getData();
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

  /**
   * Loads translation keys for placeholders and error messages.
   */
  private loadTranslations(): void {
    const keys: string[] = [
      'CONTACT.NAME_PLACEHOLDER',
      'CONTACT.EMAIL_PLACEHOLDER',
      'CONTACT.MESSAGE_PLACEHOLDER',
      'CONTACT.NAME_ERROR',
      'CONTACT.EMAIL_ERROR',
      'CONTACT.MESSAGE_ERROR',
      'CONTACT.TERMS_ERROR'
    ];
    this.translate.get(keys).subscribe(translations => {
      this.setTranslationData(translations);
      this.updateInputPlaceholders();
    });
  }

  /**
   * Sets the placeholders and error messages from translation data.
   * @param translations - Translation key-value pairs
   */
  private setTranslationData(translations: Record<string, string>): void {
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
  }

  /**
   * Updates the actual input elements with translated placeholders.
   */
  private updateInputPlaceholders(): void {
    if (this.nameInput) this.nameInput.nativeElement.placeholder = this.placeholders.name;
    if (this.emailInput) this.emailInput.nativeElement.placeholder = this.placeholders.email;
    if (this.messageInput) this.messageInput.nativeElement.placeholder = this.placeholders.message;
  }

  /**
   * Updates the placeholder and CSS class for a given field.
   * @param field - The field to update
   * @param isError - Whether to show the error state
   * @param errorClass - CSS class for error styling
   */
  private updateField(field: { control: string; input: any; default: string; error: string }, isError: boolean, errorClass: string): void {
    const el = field.input.nativeElement;
    el.placeholder = isError ? field.error : field.default;
    el.classList.toggle(errorClass, isError);

    if (isError && field.control === 'email') el.value = '';
  }

  /**
   * Determines whether a field is in an error state.
   * @param field - The field to check
   * @param form - NgForm instance
   * @param hover - Whether the hover check should apply
   * @returns True if the field has an error
   */
  private isFieldError(field: { control: string; input: any; type?: string }, form: NgForm, hover: boolean): boolean {
    if (!hover) return false;

    let invalid: boolean = form.controls[field.control]?.invalid;

    if (field.type === 'email' && field.input.nativeElement.value) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      invalid ||= !pattern.test(field.input.nativeElement.value);
    }
    if (field.type === 'checkbox') {
      invalid ||= !field.input.nativeElement.checked;
      this.showCheckboxError = invalid;
    }
    return invalid;
  }

  /** Clears animation on the form submit button */
  private clearButtonAnimation() {
    const button: Element | null = document.querySelector('form button');
    if (!button) return;

    const span: HTMLSpanElement | null = button.querySelector('span');
    if (span) {
      span.style.animation = 'none';
      setTimeout((): string => span.style.animation = '', 0);
    }
  }

  /**
   * Handles form submission.
   * Sends POST request if form is valid and mailTest is false.
   * Otherwise, just shows success message for testing.
   * @param ngForm - NgForm instance of the form
   */
  onSubmit(ngForm: NgForm): void {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response: Object): void => { this.successfulSend(ngForm) },
          error: (error: any): void => { console.error(error) },
          complete: (): void => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.successfulSend(ngForm)
    }
  }

  /** Updates the contact service with current form input values */
  onInputChange(): void {
    this.contactService.setData({
      name: this.contactData.name,
      email: this.contactData.email,
      message: this.message
    });
  }

  /** Updates message property and saves changes to ContactService */
  onMessageChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
    this.onInputChange();
  }

  /**
   * Handles UI changes after a successful form submission.
   * Clears form, animations, and shows success message briefly.
   * @param ngForm - NgForm instance
   */
  successfulSend(ngForm: NgForm): void {
    this.contactService.clearData(); this.clearButtonAnimation(); ngForm.resetForm()

    this.successMessageVisible = true;
    this.successMessageHide = false;

    setTimeout(() => {
      this.successMessageHide = true;

      setTimeout(() => {
        this.successMessageVisible = false;
      }, 500);
    }, 3000);
  }

  /**
   * Checks all form fields for errors and updates their appearance.
   * @param form - NgForm instance
   * @param hover - Whether to apply hover error checks
   */
  checkForm(form: NgForm, hover: boolean): void {
    const errorColorClass = 'error-placeholder';
    const fields: FormField[] = [
      { input: this.nameInput, default: this.placeholders.name, error: this.errors.name, control: 'name' },
      { input: this.emailInput, default: this.placeholders.email, error: this.errors.email, type: 'email', control: 'email' },
      { input: this.messageInput, default: this.placeholders.message, error: this.errors.message, control: 'message' },
      { input: this.subscribeInput, default: '', error: this.errors.checkbox, type: 'checkbox', control: 'subscribe' }
    ];

    fields.forEach(field => {
      const isError: boolean = this.isFieldError(field, form, hover);
      this.updateField(field, isError, errorColorClass);
    });
  }

  /** Clears checkbox error state if checked */
  clearCheckboxError(): void {
    const checkbox = this.subscribeInput.nativeElement as HTMLInputElement;
    if (checkbox.checked) {
      this.showCheckboxError = false;
    }
  }

  /**
   * Starts hover animation for form buttons.
   * @param event - MouseEvent triggered on hover
   */
  onHover(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const targetBtn = event.target as HTMLButtonElement;

    if (targetBtn.disabled) return;

    this.animationService.startMarqueeBtnAnimation(target);
  }

  /**
   * Stops hover animation for form buttons.
   * @param event - MouseEvent triggered on hover out
   */
  onHoverOut(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const targetBtn = event.target as HTMLButtonElement;

    if (targetBtn.disabled) return;

    this.animationService.returnMarqueeBtnToCenter(target);
  }

  /**
   * Automatically grows the textarea height based on content.
   * @param event - Input event from textarea
   */
  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";

    this.contactService.setData({ messageHeight: `${textarea.scrollHeight}px` });
  }

  /**
   * Adds/removes border styles for form labels when hovering over the middle area.
   * @param isHovering - Whether the hover effect is active
   */
  hoverMiddle(isHovering: boolean): void {
    const labels = document.querySelectorAll('form label') as NodeListOf<HTMLElement>;
    if (labels.length < 3) return;

    labels[0].style.borderBottom = isHovering ? '0' : '';
    labels[1].style.borderTop = isHovering ? '1px solid #3DCFB6' : '';
    labels[1].style.borderBottom = isHovering ? '1px solid #3DCFB6' : '';
    labels[2].style.borderTop = isHovering ? '0' : '';
  }

  /** Smooth scrolls to the top of the page */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
