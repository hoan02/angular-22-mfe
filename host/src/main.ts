(globalThis as any).ngDevMode = (globalThis as any).ngDevMode || {};
import { initFederation } from '@softarc/native-federation-orchestrator';
import type { LoadRemoteModule } from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

const manifest = {
  mfe1: 'http://localhost:4201/remoteEntry.json',
};

initFederation(manifest, {
  ...useShimImportMap({ shimMode: true }),
  sse: true,
  logger: consoleLogger,
  storage: globalThisStorageEntry,
  hostRemoteEntry: './remoteEntry.json',
  logLevel: 'debug',
})
  .catch((err) => console.error(err))
  .then((result) => {
    const { loadRemoteModule } = result as { loadRemoteModule: LoadRemoteModule };
    return import('./bootstrap').then((m) => {
      (window as any).loadRemoteModule = loadRemoteModule;
      return m.bootstrap(loadRemoteModule);
    });
  })
  .catch((err) => console.error(err));
