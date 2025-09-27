import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './legal-notice.component.html',
  styleUrl: '../../styles/_terms-privacy.scss'
})
/**
 * LegalNoticeComponent
 *
 * Standalone Angular component responsible for rendering
 * the application's legal notice (imprint) page.
 *
 * Features:
 * - Uses ngx-translate for localized content
 * - Provides navigation links via RouterLink
 * - On browser platforms, applies a `terms-privacy` CSS class to `<body>`
 *   for page-specific global styling
 */
export class LegalNoticeComponent implements OnInit{

  /**
   * Creates an instance of LegalNoticeComponent.
   *
   * @param platformId - Angular platform identifier (used to detect browser vs. server-side rendering)
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lifecycle hook that runs after component initialization.
   *
   * Adds a `terms-privacy` class
   * to the document body so that global terms/privacy styles can be applied.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('terms-privacy');
    }
  }
}
