import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  scrollToFragment(fragment: string, offset = 10) {
    const el = document.getElementById(fragment);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
