import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ScrollService} from "../../scroll.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private scrollService: ScrollService) {}

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
