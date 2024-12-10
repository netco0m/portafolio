import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { GALLERY_CONFIG, GalleryConfig, ImageSize } from 'ng-gallery';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),{ provide: GALLERY_CONFIG,  useValue: { imageSize: ImageSize.Cover, autoHeight: true } as GalleryConfig }]
};
