import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() {}

  startMarqueeBtnAnimation(element: EventTarget | null) {
    if (element) {
      const el = element as HTMLElement;
      const span = el.querySelector('span')!;
      span.style.animation = 'centerToLeft 2s linear 1, rightToLeft 3s linear infinite 2s';
    }
  }

  returnMarqueeBtnToCenter(element: EventTarget | null) {
    if (element) {
      const el = element as HTMLElement;
      const span = el.querySelector('span');
      if (!span) return;

      const computedStyle = getComputedStyle(span);
      span.style.setProperty('--current-left', computedStyle.left);
      span.style.setProperty('--current-transform', computedStyle.transform);
      span.style.animation = 'returnToCenter 0.5s forwards';
    }
  }
}
