import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AboveTheFoldComponent} from "./above-the-fold/above-the-fold.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {SkillSetComponent} from "./skill-set/skill-set.component";
import {FeaturedProjectsComponent} from "./featured-projects/featured-projects.component";
import {ColleaguesSayComponent} from "./colleagues-say/colleagues-say.component";
import {ContactMeComponent} from "./contact-me/contact-me.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AboveTheFoldComponent,
    AboutMeComponent,
    SkillSetComponent,
    FeaturedProjectsComponent,
    ColleaguesSayComponent,
    ContactMeComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
/**
 * LandingPageComponent
 *
 * Standalone Angular component representing the main landing page of the application.
 *
 * Features:
 * - Composes multiple sections as standalone components:
 *   - AboveTheFoldComponent
 *   - AboutMeComponent
 *   - SkillSetComponent
 *   - FeaturedProjectsComponent
 *   - ColleaguesSayComponent
 *   - ContactMeComponent
 * - Ensures that global body styling is reset when viewing the landing page.
 */
export class LandingPageComponent implements OnInit{

  /**
   * Creates an instance of LandingPageComponent.
   *
   * @param platformId - Angular platform identifier (used to detect browser vs. server-side rendering)
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lifecycle hook that runs after component initialization.
   *
   * If running in the browser, removes the `terms-privacy` class from the body
   * to ensure landing page styles are applied correctly.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('terms-privacy');
    }
  }
}
