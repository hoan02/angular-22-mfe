(globalThis as any).ngDevMode = (globalThis as any).ngDevMode || {};
import { initFederation } from '@angular-architects/native-federation';

initFederation({ mfe1: './remoteEntry.json' })
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
