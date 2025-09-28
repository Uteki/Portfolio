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
/**
 * HeaderComponent
 *
 * Standalone Angular component responsible for rendering the application header.
 *
 * Features:
 * - Displays navigation menu and language switcher
 * - Tracks current route to handle page-specific logic (e.g., legal pages)
 * - Smooth scrolls to sections using ScrollService
 * - Supports internationalization via TranslateService
 * - Manages menu open/close state and body scroll lock
 */
export class HeaderComponent implements OnInit {
  /** Currently selected language */
  currentLang: string;

  /** Menu open/close state */
  menuOpen: boolean = false;

  /** True if the current route is a terms/legal page */
  isTermRoute: boolean = false;

  /**
   * Creates an instance of HeaderComponent.
   *
   * @param scrollService - Service for smooth scrolling to page sections
   * @param translate - Service for managing translations
   * @param router - Angular Router for route tracking
   * @param platformId - Platform identifier (browser or server) for SSR checks
   */
  constructor(private scrollService: ScrollService, public translate: TranslateService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang:string = localStorage.getItem('lang') || 'en';
      this.currentLang = savedLang;
      this.translate.use(savedLang);
    } else {
      this.currentLang = 'en';
    }
  }

  /**
   * Lifecycle hook that runs after component initialization.
   *
   * Subscribes to router events to update `isTermRoute` based on the current URL.
   */
  ngOnInit(): void {
    const termRoutes = ['/legal-notice', '/privacy-policy'];

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEnd = event as NavigationEnd;
        const url = navEnd.urlAfterRedirects;
        this.isTermRoute = termRoutes.some(route => url.includes(route));
      });
  }

  /**
   * Switches the current language and updates localStorage.
   *
   * @param lang - The language code to switch to (e.g., 'en', 'de')
   */
  switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.translate.use(lang);
    }
  }

  /**
   * Opens the mobile navigation menu and prevents body scroll.
   */
  openMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.classList.add('no-scroll');
  }

  /**
   * Closes the mobile navigation menu and restores body scroll.
   */
  closeMenu(): void {
    this.menuOpen = false;
    document.body.classList.remove('no-scroll');
  }

  /**
   * Scrolls smoothly to the "About Me" section.
   */
  goToMe(): void {
    this.scrollService.scrollToFragment('about', 150);
  }

  /**
   * Scrolls smoothly to the "Skills" section.
   */
  goToSkills(): void {
    this.scrollService.scrollToFragment('skills', 150);
  }

  /**
   * Scrolls smoothly to the "Projects" section.
   */
  goToProjects(): void {
    this.scrollService.scrollToFragment('projects', 150);
  }
}
