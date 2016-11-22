/* jshint node: true */

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

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
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
  }

  ENV.a2b = {
    apiEndPoint: "//ec2-35-163-32-182.us-west-2.compute.amazonaws.com:8080/api"
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' maps.gstatic.com",
    'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
  };

  ENV.googleMap = {
    libraries: ['drawing','places'],
    apiKey: 'AIzaSyBaC0ZaYK63EgIT7EE5__wa1TxUWeP8PAk',
    language: 'en'
  };

  ENV['place-autocomplete'] = {
    exclude: true
  };

  ENV.torii = {
    providers: {
      'facebook-connect': {
        appId: '1808779036077577',
        scope: 'public_profile,email'
      }
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'about'
  };

  return ENV;
};
