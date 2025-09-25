import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ScrollService } from '../../scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLang: string;
  menuOpen = false;
  isTermRoute = false;

  constructor(private scrollService: ScrollService, public translate: TranslateService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.currentLang = savedLang;
      this.translate.use(savedLang);
    } else {
      this.currentLang = 'en';
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEnd = event as NavigationEnd;
        this.isTermRoute = navEnd.urlAfterRedirects.includes('/legal-notice');
      });
  }

  switchLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.translate.use(lang);
    }
  }

  openMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.classList.add('no-scroll');
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.classList.remove('no-scroll');
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
