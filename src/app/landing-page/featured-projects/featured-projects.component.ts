import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";

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
export class FeaturedProjectsComponent implements OnInit {
  projects = [
    {
      name: 'Pok-Dex',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/pok-dex.png',
      github: 'https://github.com/Uteki/Pok-Dex',
      preview: 'pok-dex',
      descriptionKey: 'PORTFOLIO.PROJECTS.POK_DEX_DESC',
      description: ''
    },
    {
      name: 'Join',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/join.png',
      github: 'https://github.com/Uteki/Join',
      preview: 'join',
      descriptionKey: 'PORTFOLIO.PROJECTS.JOIN_DESC',
      description: ''
    },
    {
      name: 'Sharkie',
      tech: ['HTML', 'CSS', 'JavaScript'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/sharkie.png',
      github: 'https://github.com/Uteki/Sharkie',
      preview: 'sharkie',
      descriptionKey: 'PORTFOLIO.PROJECTS.SHARKIE_DESC',
      description: ''
    },
    {
      name: 'DA Bubble',
      tech: ['Angular', 'TypeScript', 'Firebase'],
      live: 'https://daniel-tran.com',
      frame: 'assets/img/previews/da_bubble.png',
      github: 'https://github.com/Uteki/da-bubble',
      preview: 'da_bubble',
      descriptionKey: 'PORTFOLIO.PROJECTS.DA_BUBBLE_DESC',
      description: ''
    }
  ];

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadTranslations();

    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    const keys = this.projects.map(p => p.descriptionKey);
    this.translate.get(keys).subscribe(translations => {
      this.projects.forEach(p => {
        p.description = translations[p.descriptionKey];
      });
    });
  }

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
