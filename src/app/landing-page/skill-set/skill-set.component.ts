import { Component } from '@angular/core';
import {AnimationService} from "../../animation.service";

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {
  constructor(private animationService: AnimationService) {}

  onHover(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  onHoverOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }
}
