import { Component } from '@angular/core';
import {AboveTheFoldComponent} from "./above-the-fold/above-the-fold.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {SkillSetComponent} from "./skill-set/skill-set.component";
import {FeaturedProjectsComponent} from "./featured-projects/featured-projects.component";
import {ColleaguesSayComponent} from "./colleagues-say/colleagues-say.component";
import {ContactMeComponent} from "./contact-me/contact-me.component";

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
export class LandingPageComponent {

}
