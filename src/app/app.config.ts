import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({
      projectId: "aimstechnology-37b92",
      appId: "1:622084059247:web:151ac630d506906b8e9d9a",
      storageBucket: "aimstechnology-37b92.firebasestorage.app",
      apiKey: "AIzaSyDwm9z8kE6l0Brf35SrDpdztRG5Ngr1U4E",
      authDomain: "aimstechnology-37b92.firebaseapp.com",
      messagingSenderId: "622084059247",
      measurementId: "G-DL3RC1HCYR"
    })), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
  ]
};
