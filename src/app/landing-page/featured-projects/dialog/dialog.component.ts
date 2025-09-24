import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    NgIf,
    LowerCasePipe,
    TranslatePipe
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  projects: any[];
  currentIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.projects = data.projects;
    this.currentIndex = data.index;
  }

  get project() {
    return this.projects[this.currentIndex];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
