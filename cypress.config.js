const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    ceoLogin: 'ceo@tourmalinecore.com',
    ceoPassword: 'cEoPa$$wo1d',
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: { MAILSLURP_API_KEY: 'd4297d96dcba82391396d35f1816ea1a84d1bf2b76bafec682756611cf383d00' },
});
