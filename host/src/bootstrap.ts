import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LoadRemoteModule } from '@softarc/native-federation-orchestrator';

export const bootstrap = (loadRemoteModule: LoadRemoteModule) =>
  bootstrapApplication(App, appConfig(loadRemoteModule)).catch((err) =>
    console.error(err),
  );
