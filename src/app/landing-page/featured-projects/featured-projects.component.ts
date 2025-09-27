import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";

/**
 * Represents a featured project with metadata and translation keys.
 */
export interface Project {
  /** Project name */
  name: string;

  /** Array of technologies used in the project */
  tech: string[];

  /** URL to the live project */
  live: string;

  /** Screenshot or preview image path */
  frame: string;

  /** URL to the GitHub repository */
  github: string;

  /** Short preview identifier */
  preview: string;

  /** Translation key for the project description */
  descriptionKey: string;

  /** Translated description (populated dynamically via TranslateService) */
  description: string;
}

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [
    NgSwitch,
    NgClass,
    NgForOf,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
/**
 * FeaturedProjectsComponent
 *
 * Standalone Angular component that displays a list of featured projects.
 *
 * Features:
 * - Shows a collection of projects with name, technologies, live link, GitHub link, and preview image.
 * - Loads project descriptions dynamically based on the current language using `TranslateService`.
 * - Opens a modal dialog for detailed project view using `MatDialog` and `DialogComponent`.
 * - Updates project descriptions automatically when the language changes.
 */
export class FeaturedProjectsComponent implements OnInit {

  /** List of featured projects to display in the component */
  projects: Project[] = [
    {
      name: 'Pok-Dex',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      live: 'https://daniel-tran.com/pok-dex',
      frame: 'assets/img/previews/pok-dex.png',
      github: 'https://github.com/Uteki/Pok-Dex',
      preview: 'pok-dex',
      descriptionKey: 'PORTFOLIO.PROJECTS.POK_DEX_DESC',
      description: ''
    },
    {
      name: 'Join',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      live: 'https://daniel-tran.com/join',
      frame: 'assets/img/previews/join.png',
      github: 'https://github.com/Uteki/Join',
      preview: 'join',
      descriptionKey: 'PORTFOLIO.PROJECTS.JOIN_DESC',
      description: ''
    },
    {
      name: 'Sharkie',
      tech: ['HTML', 'CSS', 'JavaScript'],
      live: 'https://daniel-tran.com/sharkie',
      frame: 'assets/img/previews/sharkie.png',
      github: 'https://github.com/Uteki/Sharkie',
      preview: 'sharkie',
      descriptionKey: 'PORTFOLIO.PROJECTS.SHARKIE_DESC',
      description: ''
    },
    // {
    //   name: 'DA Bubble',
    //   tech: ['Angular', 'TypeScript', 'Firebase'],
    //   live: 'https://daniel-tran.com/da-bubble',
    //   frame: 'assets/img/previews/da_bubble.png',
    //   github: 'https://github.com/Uteki/da-bubble',
    //   preview: 'da_bubble',
    //   descriptionKey: 'PORTFOLIO.PROJECTS.DA_BUBBLE_DESC',
    //   description: ''
    // }
  ];

  /**
   * Creates an instance of FeaturedProjectsComponent.
   *
   * @param dialog - Angular Material dialog service for opening modals
   * @param translate - Translation service for dynamic localization
   */
  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   *
   * - Loads translated descriptions for all projects.
   * - Subscribes to language change events to update project descriptions dynamically.
   */
  ngOnInit(): void {
    this.loadTranslations();

    this.translate.onLangChange.subscribe((): void => {
      this.loadTranslations();
    });
  }

  /**
   * Loads the translated descriptions for each project using the
   * `descriptionKey` property of each project and updates the `description`.
   */
  loadTranslations(): void {
    const keys: string[] = this.projects.map(p => p.descriptionKey);
    this.translate.get(keys).subscribe(translations => {
      this.projects.forEach(p => {
        p.description = translations[p.descriptionKey];
      });
    });
  }

  /**
   * Opens a modal dialog to show detailed information about a selected project.
   *
   * @param index - Index of the selected project in the `projects` array
   */
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
