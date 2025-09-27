import { Component, HostListener, OnInit } from '@angular/core';
import { AnimationService } from "../../animation.service";
import { NgForOf, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ScrollService } from "../../scroll.service";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
/**
 * AboveTheFoldComponent
 *
 * Standalone Angular component representing the top section of the landing page.
 *
 * Features:
 * - Displays a dynamic marquee with translated text items
 * - Tracks mouse movement for interactive animations (CSS variables `--x` and `--y`)
 * - Provides scroll navigation to other page sections (projects, contact)
 * - Uses AnimationService for button marquee animations
 * - Reacts to language changes via TranslateService
 */
export class AboveTheFoldComponent implements OnInit {

  /** Array of translated items displayed in the marquee */
  items: string[] = [];

  /**
   * Listens for mouse movements on the document and updates CSS variables.
   *
   * @param event - The mouse event containing clientX and clientY coordinates
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    document.body.style.setProperty('--x', `${event.clientX}px`);
    document.body.style.setProperty('--y', `${event.clientY}px`);
  }

  /**
   * Creates an instance of AboveTheFoldComponent.
   *
   * @param animationService - Service for handling marquee button animations
   * @param scrollService - Service for smooth scrolling to page sections
   * @param translate - Service for managing translations and reacting to language changes
   */
  constructor(
    private animationService: AnimationService,
    private scrollService: ScrollService,
    private translate: TranslateService
  ) {}

  /**
   * Lifecycle hook that runs after component initialization.
   *
   * - Loads marquee items initially
   * - Subscribes to language change events to reload translated items
   */
  ngOnInit(): void {
    this.loadItems();

    this.translate.onLangChange.subscribe((): void => {
      this.loadItems();
    });
  }

  /**
   * Loads translated items for the marquee section.
   * Fetches translations for predefined keys and updates the `items` array.
   */
  loadItems(): void {
    const keys: string[] = [
      'ABOVE.MARQUEE.AVAILABLE_REMOTE',
      'ABOVE.MARQUEE.FRONTEND_DEV',
      'ABOVE.MARQUEE.BASED_IN',
      'ABOVE.MARQUEE.OPEN_TO_WORK'
    ];

    this.translate.get(keys).subscribe(translations => {
      this.items = keys.map(key => translations[key]);
    });
  }

  /**
   * Starts the marquee button animation when the user hovers over a target element.
   *
   * @param event - The hover event from the DOM element
   */
  onHover(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  /**
   * Returns the marquee button to its original position when the user stops hovering.
   *
   * @param event - The mouse leave event from the DOM element
   */
  onHoverOut(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }

  /**
   * Scrolls smoothly to the contact section of the page.
   */
  goToContact(): void {
    this.scrollService.scrollToFragment('contact', 200);
  }

  /**
   * Scrolls smoothly to the projects section of the page.
   */
  goToProjects(): void {
    this.scrollService.scrollToFragment('projects', 100);
  }
}
