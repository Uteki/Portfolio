import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [
    NgSwitch,
    NgClass,
    NgForOf,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {
  projects = [
    {
      name: 'Pok-Dex',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      preview: 'pok-dex'
    },
    {
      name: 'Join',
      tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      preview: 'join'
    },
    {
      name: 'Sharkie',
      tech: ['HTML', 'CSS', 'JavaScript'],
      preview: 'sharkie'
    },
    {
      name: 'DA Bubble',
      tech: ['Angular', 'TypeScript', 'Firebase'],
      preview: 'da_bubble'
    }
  ];
}
