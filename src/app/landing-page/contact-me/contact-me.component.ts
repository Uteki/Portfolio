import { Component } from '@angular/core';
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

  constructor(private animationService: AnimationService) {}

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
    if (form.valid) {
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
