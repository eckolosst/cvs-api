var Sails = require('sails');
var _ = require('lodash');

global.chai = require('chai');
global.should = chai.should();

before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift(
    {
      log: {
        // level: 'silent'
      },
      hooks: {
        grunt: false
      },
      // models: {
      //   datastore: 'unitTestConnection',
      //   migrate: 'drop'
      // },
      // datastores: {
      //   unitTestConnection: {
      //     adapter: 'sails-disk'
      //   }
      // }
    },
    function(err, server) {
      if (err) return done(err);
      // here you can load fixtures, etc.
      return done(err, sails);
    }
  );
});

after(function(done) {
  // here you can clear fixtures, etc.
  if (sails && _.isFunction(sails.lower)) {
    sails.lower(done);
  }
});
