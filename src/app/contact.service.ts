import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Interface representing the structure of contact form data.
 */
export interface ContactData {
  /** Name of the user submitting the form */
  name: string;
  /** Email address of the user */
  email: string;
  /** Message text from the user */
  message: string;
  /** Optional height of the message field (adjusts for mobile/desktop) */
  messageHeight?: string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing contact form data state.
 *
 * Responsibilities:
 * - Stores and retrieves contact form values (`name`, `email`, `message`)
 * - Automatically sets the message field height depending on device width
 * - Provides utility methods to set, get, and clear the form data
 */
export class ContactService {
  /** Internal storage for contact form data */
  private data: ContactData;

  /**
   * Creates a new ContactService instance.
   * Initializes default contact form data and sets `messageHeight` dynamically
   * depending on whether the app is running in the browser and on device width.
   *
   * @param platformId - Angular platform identifier (browser or server)
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isMobileWidth: boolean = isPlatformBrowser(this.platformId) && window.innerWidth <= 768;
    this.data = {
      name: '',
      email: '',
      message: '',
      messageHeight: isMobileWidth ? '19px' : '22px'
    };
  }

  /**
   * Updates the current form data with the provided values.
   * Any missing fields remain unchanged.
   *
   * @param data - Partial contact form data to merge into the existing state
   */
  setData(data: Partial<ContactData>): void {
    this.data = { ...this.data, ...data };
  }

  /**
   * Retrieves a copy of the current contact form data.
   *
   * @returns A new object containing the current form state
   */
  getData(): ContactData {
    return { ...this.data };
  }

  /**
   * Resets the contact form data back to defaults.
   * Also recalculates the `messageHeight` based on device width.
   */
  clearData(): void {
    const isMobileWidth: boolean = isPlatformBrowser(this.platformId) && window.innerWidth <= 768;
    this.data = {
      name: '',
      email: '',
      message: '',
      messageHeight: isMobileWidth ? '19px' : '22px'
    };
  }
}
