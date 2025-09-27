import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
/**
 * AboutMeComponent
 *
 * Standalone Angular component representing the "About Me" section.
 *
 * Features:
 * - Displays personal information and bio
 * - Handles hover state for interactive UI elements (e.g., images or cards)
 * - Uses NgOptimizedImage for optimized images
 * - Supports translation via TranslatePipe
 */
export class AboutMeComponent {
  /** Tracks whether the interactive element is currently hovered */
  hovered: boolean = false;

  /**
   * Sets the hover state to true.
   * Can be bound to mouse enter events to trigger hover animations or styles.
   */
  onHover(): void {
    this.hovered = true;
  }
}
