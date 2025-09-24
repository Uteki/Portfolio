import { Injectable } from '@angular/core';

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
  private data: ContactData = { name: '', email: '', message: '', messageHeight: '22px' };

  setData(data: Partial<ContactData>) {
    this.data = { ...this.data, ...data };
  }

  getData(): ContactData {
    return { ...this.data };
  }

  clearData() {
    this.data = { name: '', email: '', message: '', messageHeight: '22px' };
  }
}

