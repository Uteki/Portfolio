import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colleagues-say',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './colleagues-say.component.html',
  styleUrls: ['./colleagues-say.component.scss'],
})
export class ColleaguesSayComponent implements AfterViewInit {
  @ViewChild('swiper', { static: true }) swiperEl!: ElementRef;

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const swiperContainer = this.swiperEl.nativeElement;
      const swiperInstance = swiperContainer.swiper;

      const prevBtn = document.querySelector('.prev') as HTMLElement;
      const nextBtn = document.querySelector('.next') as HTMLElement;
      const paginationContainer = document.querySelector('.custom-pagination') as HTMLElement;

      const shadowRoot = this.swiperEl.nativeElement.shadowRoot;
      const internalSlider = shadowRoot.querySelector('.swiper') as HTMLElement;

      if (internalSlider) {
        internalSlider.style.overflow = 'visible';
      }

      const updatePagination = () => {
        if (!swiperInstance) return;

        const realIndex = swiperInstance.realIndex;
        const totalSlides = swiperInstance.slides.length;

        paginationContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
          const bullet = document.createElement('div');
          bullet.classList.add('bullet');
          if (i === realIndex) bullet.classList.add('active');

          bullet.addEventListener('click', () => swiperInstance.slideToLoop(i));
          paginationContainer.appendChild(bullet);
        }
      };

      updatePagination();
      swiperInstance.on('slideChange', updatePagination);

      prevBtn.addEventListener('click', () => swiperInstance.slidePrev());
      nextBtn.addEventListener('click', () => swiperInstance.slideNext());
    }
  }
}
