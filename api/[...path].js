// Simple API handler for Vercel
const express = require('express');
const app = express();

// Import your existing routes
const { registerRoutes } = require('../server/routes.js');

let initialized = false;

module.exports = async (req, res) => {
  if (!initialized) {
    await registerRoutes(app);
    initialized = true;
  }

  return app(req, res);
};