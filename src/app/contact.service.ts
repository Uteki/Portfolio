import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ContactData {
  name: string;
  email: string;
  message: string;
  messageHeight?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private data: ContactData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isMobileWidth = isPlatformBrowser(this.platformId) && window.innerWidth <= 768;
    this.data = {
      name: '',
      email: '',
      message: '',
      messageHeight: isMobileWidth ? '19px' : '22px'
    };
  }

  setData(data: Partial<ContactData>) {
    this.data = { ...this.data, ...data };
  }

  getData(): ContactData {
    return { ...this.data };
  }

  clearData() {
    const isMobileWidth = isPlatformBrowser(this.platformId) && window.innerWidth <= 768;
    this.data = {
      name: '',
      email: '',
      message: '',
      messageHeight: isMobileWidth ? '19px' : '22px'
    };
  }
}
