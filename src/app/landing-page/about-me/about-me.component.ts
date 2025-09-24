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
export class AboutMeComponent {
  hovered = false;

  onHover() {
    this.hovered = true;
  }
}
