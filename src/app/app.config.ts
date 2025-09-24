import { ApplicationConfig, inject, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync(),

    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json',
      },
    },

    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [],
      },
    }).providers ?? [],

    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeTranslations,
      multi: true,
    },
  ],
};

export function HttpLoaderFactory(): TranslateLoader {
  return new TranslateHttpLoader();
}

export function initializeTranslations() {
  return async () => {
    const translate = inject(TranslateService);
    const http = inject(HttpClient);
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      await preloadLanguages(translate, http);

      const savedLang = localStorage.getItem('lang') || 'en';
      await firstValueFrom(translate.use(savedLang));
    }
  };
}

async function preloadLanguages(translate: TranslateService, http: HttpClient) {
  const langs = ['en', 'de'];
  for (const lang of langs) {
    const translations = await firstValueFrom(
      http.get<Record<string, any>>(`./assets/i18n/${lang}.json`)
    );
    translate.setTranslation(lang, translations, true);
  }
}
