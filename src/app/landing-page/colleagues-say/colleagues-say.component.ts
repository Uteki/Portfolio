import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-colleagues-say',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './colleagues-say.component.html',
  styleUrls: ['./colleagues-say.component.scss'],
})
/**
 * ColleaguesSayComponent
 *
 * Standalone Angular component that displays testimonials or quotes from colleagues
 * using a Swiper slider.
 *
 * Features:
 * - Integrates with a Swiper slider for sliding testimonials.
 * - Custom pagination bullets with click events.
 * - Previous/Next navigation buttons.
 * - Adjusts overflow of internal slider for proper styling.
 * - Supports translation via TranslatePipe.
 */
export class ColleaguesSayComponent implements AfterViewInit {

  /**
   * Reference to the Swiper container element in the template.
   * Used to access the internal Swiper instance and its shadow DOM.
   */
  @ViewChild('swiper', { static: true }) swiperEl!: ElementRef;

  /**
   * Lifecycle hook called after the component's view has been fully initialized.
   *
   * Performs initialization tasks:
   * 1. Retrieves the Swiper instance.
   * 2. Retrieves navigation elements (prev/next buttons, pagination container).
   * 3. Adjusts internal slider overflow.
   * 4. Initializes custom pagination.
   * 5. Attaches navigation event listeners.
   */
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const swiperInstance: any = this.getSwiperInstance();
      if (!swiperInstance) return;

      const { prevBtn, nextBtn, paginationContainer } = this.getNavigationElements();
      this.adjustInternalSliderOverflow();
      this.initPagination(swiperInstance, paginationContainer);
      this.initNavigation(swiperInstance, prevBtn, nextBtn);
    }
  }

  /**
   * Retrieves the Swiper instance from the template reference.
   *
   * @returns The Swiper instance or undefined if not available.
   */
  private getSwiperInstance(): any {
    const swiperContainer: any = this.swiperEl.nativeElement;
    return swiperContainer.swiper;
  }

  /**
   * Retrieves navigation elements from the DOM: previous button, next button, and pagination container.
   *
   * @returns An object containing:
   *  - prevBtn: Previous button HTMLElement
   *  - nextBtn: Next button HTMLElement
   *  - paginationContainer: Container HTMLElement for pagination bullets
   */
  private getNavigationElements(): { prevBtn: HTMLElement; nextBtn: HTMLElement; paginationContainer: HTMLElement } {
    const prevBtn = document.querySelector('.prev') as HTMLElement;
    const nextBtn = document.querySelector('.next') as HTMLElement;
    const paginationContainer = document.querySelector('.custom-pagination') as HTMLElement;
    return { prevBtn, nextBtn, paginationContainer };
  }

  /**
   * Adjusts the internal slider's overflow to make slides visible outside the container.
   */
  private adjustInternalSliderOverflow(): void {
    const shadowRoot: any = this.swiperEl.nativeElement.shadowRoot;
    const internalSlider = shadowRoot.querySelector('.swiper') as HTMLElement;
    if (internalSlider) {
      internalSlider.style.overflow = 'visible';
    }
  }

  /**
   * Initializes the custom pagination bullets and sets up slide change handling.
   * Updates the custom pagination bullets based on the current slide index.
   *
   * @param swiperInstance - The Swiper instance to control slides
   * @param paginationContainer - The container HTMLElement for pagination bullets
   */
  private initPagination(swiperInstance: any, paginationContainer: HTMLElement): void {
    const updatePagination = (): void => {
      if (!swiperInstance) return;
      const realIndex: any = swiperInstance.realIndex;
      const totalSlides: any = swiperInstance.slides.length;
      paginationContainer.innerHTML = '';
      for (let i: number = 0; i < totalSlides; i++) {
        const bullet: HTMLDivElement = document.createElement('div');
        bullet.classList.add('bullet');
        if (i === realIndex) bullet.classList.add('active');
        bullet.addEventListener('click', (): any => swiperInstance.slideToLoop(i));
        paginationContainer.appendChild(bullet);
      }
    };
    updatePagination(); swiperInstance.on('slideChange', updatePagination)
  }

  /**
   * Attaches click events to previous/next buttons for slide navigation.
   *
   * @param swiperInstance - The Swiper instance to control slides
   * @param prevBtn - The previous button HTMLElement
   * @param nextBtn - The next button HTMLElement
   */
  private initNavigation(swiperInstance: any, prevBtn: HTMLElement, nextBtn: HTMLElement): void {
    prevBtn.addEventListener('click', (): any => swiperInstance.slidePrev());
    nextBtn.addEventListener('click', (): any => swiperInstance.slideNext());
  }
}
