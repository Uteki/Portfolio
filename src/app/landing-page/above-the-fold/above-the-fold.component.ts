import {Component, HostListener} from '@angular/core';
import {AnimationService} from "../../animation.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent {
  items: string[] = [
    'Available for remote work',
    'Frontend Developer',
    'Based in Munich',
    'Open to work'
  ];

   constructor(private animationService: AnimationService) {}

  //TODO: Firefly
  @HostListener('document:mousemove', ['$event'])

  onMouseMove(event: MouseEvent) {
    document.body.style.setProperty('--x', `${event.clientX}px`);
    document.body.style.setProperty('--y', `${event.clientY}px`);
  }

  onHover(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  onHoverOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }
}
