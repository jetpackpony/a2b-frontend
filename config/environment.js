/* jshint node: true */
var dotEnv = require('../config.json');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'a2b',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.googleMap = {
    libraries: ['drawing','places'],
    apiKey: dotEnv['google-api-development'],
    language: 'en'
  };

  ENV.a2b = {
    // API server address
    apiEndPoint: "//123.compute.amazonaws.com:8080/api"
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' maps.gstatic.com",
    'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
  };

  ENV['place-autocomplete'] = {
    exclude: true
  };

  if (environment === 'development') {
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-87696063-1'
    };
    ENV.googleMap.apiKey = dotEnv['google-api-production'];

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }


  return ENV;
};
