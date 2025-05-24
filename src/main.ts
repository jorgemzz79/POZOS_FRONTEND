import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/routes/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ],
});