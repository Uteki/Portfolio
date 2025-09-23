import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AnimationService} from "../../animation.service";
import {RouterLink} from "@angular/router";

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
  showCheckboxError = false;

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

  onSubmit(form: NgForm) {
    if (form.valid && form.submitted) {
      console.log('Form submitted:', form.value);
      //TODO
    }
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
