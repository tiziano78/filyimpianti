import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000', // Supporta variabili d'ambiente
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    screenshotsFolder: 'cypress/screenshots', // Organizza screenshot
    videosFolder: 'cypress/videos',           // Organizza video
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: true,                  // Migliora la sicurezza del browser nei test
    env: {
      apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:3000/api', // URL API
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  retries: {
    runMode: 2,  // Riprova i test falliti durante l'esecuzione
    openMode: 0, // Nessuna ripetizione durante l'apertura
  },
});
