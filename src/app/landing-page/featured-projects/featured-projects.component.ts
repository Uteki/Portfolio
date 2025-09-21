import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

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
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/pok-dex.png',
      github: 'https://github.com/Uteki/Pok-Dex',
      preview: 'pok-dex',
      description: 'JavaScript-based project with a connection to the RESTful Pokémon API.',
    },
    {
      name: 'Join',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/join.png',
      github: 'https://github.com/Uteki/Join',
      preview: 'join',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.'
    },
    {
      name: 'Sharkie',
      tech: ['HTML', 'CSS', 'JavaScript'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/sharkie.png',
      github: 'https://github.com/Uteki/Sharkie',
      preview: 'sharkie',
      description: 'Underwater platformer based on object-oriented approach. Help Sharkie to find coins and bubbles to fight against the killer whale.'
    },
    {
      name: 'DA Bubble',
      tech: ['Angular', 'TypeScript', 'Firebase'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/da_bubble.png',
      github: 'https://github.com/Uteki/da-bubble',
      preview: 'da_bubble',
      description: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.'
    }
  ];

  constructor(private dialog: MatDialog) {}

  openDialog(index: number): void {
    this.dialog.open(DialogComponent, {
      data: {
        projects: this.projects,
        index: index
      },
      panelClass: 'project-dialog'
    });
  }
}
