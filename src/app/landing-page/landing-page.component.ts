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
export class LandingPageComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('terms-privacy');
    }
  }
}
