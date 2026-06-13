import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // ← Apunta a tu nuevo archivo app.ts y a la clase App

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));