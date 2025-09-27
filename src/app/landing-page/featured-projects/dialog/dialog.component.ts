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
/**
 * DialogComponent
 *
 * Standalone Angular component used as a modal dialog to display detailed
 * information about featured projects. Integrates with Angular Material
 * dialog components and supports project navigation.
 *
 * Features:
 * - Displays project details (name, description, technologies, etc.)
 * - Supports navigation between multiple projects using `next` and `prev` methods
 * - Works with translations via `TranslatePipe`
 */
export class DialogComponent {

  /** Array of projects passed to the dialog */
  projects: any[];

  /** Current index of the displayed project */
  currentIndex: number;

  /**
   * Creates an instance of DialogComponent.
   *
   * @param data - Data injected into the dialog using `MAT_DIALOG_DATA`.
   *               Should contain `projects` array and `index` of the selected project.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.projects = data.projects;
    this.currentIndex = data.index;
  }

  /**
   * Returns the currently displayed project based on `currentIndex`.
   */
  get project(): any {
    return this.projects[this.currentIndex];
  }

  /**
   * Moves to the next project in the array. Wraps around to the first project
   * if the current project is the last one.
   */
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  /**
   * Moves to the previous project in the array. Wraps around to the last project
   * if the current project is the first one.
   */
  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
