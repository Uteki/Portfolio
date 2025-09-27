import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service that manages button marquee animations.
 *
 * Provides methods to:
 * - Trigger a marquee-style left-scrolling animation on a button span
 * - Return the span smoothly back to its centered position
 */
export class AnimationService {

  constructor() {}

  /**
   * Starts the marquee button animation.
   *
   * Applies a sequence of CSS animations to the first `<span>` inside the target element:
   * - Moves the text from center to left (`centerToLeft`)
   * - Then continuously scrolls text from right to left (`rightToLeft`)
   *
   * @param element - The event target that triggered the animation (expected to contain a <span>)
   */
  startMarqueeBtnAnimation(element: EventTarget | null) {
    if (element) {
      const el = element as HTMLElement;
      const span: HTMLSpanElement = el.querySelector('span')!;
      span.style.animation = 'centerToLeft 2s linear 1, rightToLeft 3s linear infinite 2s';
    }
  }

  /**
   * Returns the marquee button span smoothly back to center.
   *
   * - Captures the current computed `left` and `transform` values of the span
   * - Stores them in CSS custom properties (`--current-left`, `--current-transform`)
   * - Applies the `returnToCenter` animation for a smooth reset
   *
   * @param element - The event target that triggered the reset (expected to contain a <span>)
   */
  returnMarqueeBtnToCenter(element: EventTarget | null) {
    if (element) {
      const el = element as HTMLElement;
      const span: HTMLSpanElement | null = el.querySelector('span');
      if (!span) return;

      const computedStyle: CSSStyleDeclaration = getComputedStyle(span);
      span.style.setProperty('--current-left', computedStyle.left);
      span.style.setProperty('--current-transform', computedStyle.transform);
      span.style.animation = 'returnToCenter 0.5s forwards';
    }
  }
}
