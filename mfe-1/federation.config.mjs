import { withNativeFederation, shareAll } from '@angular-architects/native-federation/config';

const shared = shareAll(
  { singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' },
  {
    overrides: {
      // includeSecondaries is an opt-out of ignoreUnusedDeps, so all of
      // @angular/core is shared to prevent mismatches.
      '@angular/core': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
        build: 'package',
        includeSecondaries: { keepAll: true },
      },
    },
  },
);

const skipList = [
  'rxjs/ajax',
  'rxjs/fetch',
  'rxjs/testing',
  'rxjs/webSocket',
  '@spartan-ng/brain',
  'tailwind-merge',
  'clsx',
  'class-variance-authority',
  'tailwindcss',
  '@tailwindcss/postcss',
  'postcss',
  '@angular-architects/native-federation',
  '@softarc/native-federation',
  '@softarc/native-federation-runtime',
  '@softarc/native-federation-orchestrator',
  '@angular/cdk/schematics',
  '@angular-devkit/core',
  '@angular-devkit/schematics',
];

for (const pkg of skipList) {
  delete shared[pkg];
}

export default withNativeFederation({
  name: 'mfe1',
  exposes: {
    './Component': './src/app/app.ts',
  },
  shared,
  skip: skipList,
  features: {
    ignoreUnusedDeps: false,
    denseChunking: true,
  },
});
