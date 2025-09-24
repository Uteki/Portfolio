import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentLang: string;

  constructor(private scrollService: ScrollService, public translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.currentLang = savedLang;
      this.translate.use(savedLang);
    } else {
      this.currentLang = 'en';
    }
  }

  switchLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.translate.use(lang);
    }
  }

  goToMe() {
    this.scrollService.scrollToFragment('about', 100);
  }

  goToSkills() {
    this.scrollService.scrollToFragment('skills', 100);
  }

  goToProjects() {
    this.scrollService.scrollToFragment('projects', 100);
  }
}
