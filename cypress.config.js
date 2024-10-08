import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    baseUrl: 'http://localhost:3000', // Update this to your app's URL
    supportFile: 'cypress/support/e2e.ts',
  },
});
