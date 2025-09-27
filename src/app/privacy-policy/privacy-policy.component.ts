import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-private-policy',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../../styles/_terms-privacy.scss', './privacy-policy.component.scss']
})
/**
 * PrivacyPolicyComponent
 *
 * Standalone Angular component responsible for rendering
 * the application's privacy policy page.
 *
 * Features:
 * - Uses ngx-translate for localized text rendering
 * - Provides router navigation via RouterLink
 * - On browser platforms, applies a `terms-privacy` CSS class to `<body>`
 *   for page-specific styling
 */
export class PrivacyPolicyComponent implements OnInit{

  /**
   * Creates an instance of PrivacyPolicyComponent.
   *
   * @param platformId - Angular platform identifier (used to detect SSR vs. browser)
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lifecycle hook that runs after component initialization.
   *
   * Adds a `terms-privacy` class
   * to the document body so that global styles can be applied.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('terms-privacy');
    }
  }
}
