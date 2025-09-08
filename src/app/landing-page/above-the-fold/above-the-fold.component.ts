import {Component, HostListener} from '@angular/core';
import {AnimationService} from "../../animation.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent {

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
