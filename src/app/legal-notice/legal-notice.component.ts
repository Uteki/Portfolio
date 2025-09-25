import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './legal-notice.component.html',
  styleUrl: '../../styles/_terms-privacy.scss'
})
export class LegalNoticeComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('terms-privacy');
    }
  }
}
