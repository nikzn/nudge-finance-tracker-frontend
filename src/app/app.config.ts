import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptorInterceptor } from './shared/interceptor/loading-interceptor-interceptor';
import { errorInterceptor } from './shared/interceptor/error-interceptor';
import { MessageService } from 'primeng/api';
import { authenticationInterceptor } from './shared/interceptor/authentication-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    MessageService,
    provideHttpClient(withInterceptors([authenticationInterceptor, loadingInterceptorInterceptor, errorInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
