import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
/**
 * FooterComponent
 *
 * Standalone Angular component responsible for rendering the footer section
 * of the application.
 *
 * Features:
 * - Displays footer content (links, copyright, etc.)
 * - Provides a smooth "scroll to top" functionality
 * - Supports internationalization via TranslatePipe
 * - Uses RouterLink for in-app navigation
 * - Uses NgOptimizedImage for optimized images
 */
export class FooterComponent {

  /**
   * Smoothly scrolls the viewport to the top of the page.
   *
   * Can be bound to a "Back to Top" button in the template.
   *
   * @example
   * <button (click)="scrollToTop()">Back to Top</button>
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
