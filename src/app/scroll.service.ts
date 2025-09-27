import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
/**
 * Service that provides smooth scrolling functionality
 * to specific elements in the document by their fragment ID.
 *
 * Useful for in-page navigation (e.g., anchor links in a single-page app).
 */
export class ScrollService {

  /**
   * Smoothly scrolls the viewport to an element with the given fragment ID.
   *
   * @param fragment - The ID of the target element to scroll to
   * @param offset - Optional vertical offset in pixels from the element's top position (default: 10)
   *
   * @example
   * // Scroll to the element with ID "about" with default offset
   * scrollService.scrollToFragment('about');
   *
   * @example
   * // Scroll to "contact" element leaving 50px space from top
   * scrollService.scrollToFragment('contact', 50);
   */
  scrollToFragment(fragment: string, offset = 10) {
    const el: HTMLElement | null = document.getElementById(fragment);
    if (el) {
      const top: number = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
