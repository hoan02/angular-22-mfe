import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoadRemoteModule } from '@softarc/native-federation-orchestrator';

export const MODULE_LOADER = new InjectionToken<LoadRemoteModule>('loader');

const routes = (loadRemoteModule?: LoadRemoteModule): Routes => {
  const result: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadComponent: () => import('./home/home').then((m) => m.Home),
    },
  ];

  if (loadRemoteModule) {
    result.push({
      path: 'mfe1',
      loadComponent: () =>
        loadRemoteModule('mfe1', './Component').then((m: any) => m.App),
    });
  }

  return result;
};

export const appConfig = (loadRemoteModule?: LoadRemoteModule): ApplicationConfig => ({
  providers: [
    { provide: MODULE_LOADER, useValue: loadRemoteModule },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes(loadRemoteModule)),
  ],
});
