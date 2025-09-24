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
export class AboveTheFoldComponent implements OnInit {
  items: string[] = [];

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    document.body.style.setProperty('--x', `${event.clientX}px`);
    document.body.style.setProperty('--y', `${event.clientY}px`);
  }

  constructor(
    private animationService: AnimationService,
    private scrollService: ScrollService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadItems();

    this.translate.onLangChange.subscribe(() => {
      this.loadItems();
    });
  }

  loadItems() {
    const keys = [
      'ABOVE.MARQUEE.AVAILABLE_REMOTE',
      'ABOVE.MARQUEE.FRONTEND_DEV',
      'ABOVE.MARQUEE.BASED_IN',
      'ABOVE.MARQUEE.OPEN_TO_WORK'
    ];

    this.translate.get(keys).subscribe(translations => {
      this.items = keys.map(key => translations[key]);
    });
  }

  onHover(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  onHoverOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }

  goToContact() {
    this.scrollService.scrollToFragment('contact', 200);
  }

  goToProjects() {
    this.scrollService.scrollToFragment('projects', 100);
  }
}
