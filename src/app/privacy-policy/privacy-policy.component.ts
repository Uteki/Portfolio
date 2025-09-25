import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-private-policy',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../../styles/_terms-privacy.scss', './privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('terms-privacy');
    }
  }
}
