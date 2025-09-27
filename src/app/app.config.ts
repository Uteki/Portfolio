import { ApplicationConfig, inject, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, HttpClient, withFetch} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

/**
 * Global Angular application configuration.
 *
 * Provides:
 * - Router configuration
 * - HttpClient (with Fetch API)
 * - Client hydration
 * - Async animations
 * - Translation loader (ngx-translate)
 * - Application initializer that preloads translations before app startup
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),

    /**
     * Translation loader configuration for ngx-translate.
     * Defines the prefix/suffix path to translation JSON files.
     */
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json',
      },
    },

    /**
     * Provides ngx-translate with a TranslateLoader instance.
     */
    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [],
      },
    }).providers ?? [],

    /**
     * Initializes translations on app startup.
     * Loads available languages and applies saved language from localStorage.
     */
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeTranslations,
      multi: true,
    },
  ],
};

/**
 * Factory function to create a TranslateLoader instance.
 *
 * @returns A TranslateHttpLoader configured to load translation files
 */
export function HttpLoaderFactory(): TranslateLoader {
  return new TranslateHttpLoader();
}

/**
 * Initializes translations during app startup.
 *
 * - Runs only on the browser platform
 * - Preloads all supported languages into ngx-translate
 * - Applies the last saved language from localStorage (defaults to `en`)
 *
 * @returns An async function executed during Angular's APP_INITIALIZER phase
 */
export function initializeTranslations(): () => Promise<void> {
  return async (): Promise<void> => {
    const translate: TranslateService = inject(TranslateService);
    const http: HttpClient = inject(HttpClient);
    const platformId: Object = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      await preloadLanguages(translate, http);

      const savedLang: string = localStorage.getItem('lang') || 'en';
      await firstValueFrom(translate.use(savedLang));
    }
  };
}

/**
 * Preloads all supported languages into the TranslateService.
 *
 * @param translate - The TranslateService used to manage translations
 * @param http - HttpClient used to fetch JSON translation files
 */
async function preloadLanguages(translate: TranslateService, http: HttpClient) {
  const langs: string[] = ['en', 'de'];
  for (const lang of langs) {
    const translations: Record<string, any> = await firstValueFrom(
      http.get<Record<string, any>>(`./assets/i18n/${lang}.json`)
    );
    translate.setTranslation(lang, translations, true);
  }
}
