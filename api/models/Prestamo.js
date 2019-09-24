/**
 * Prestamo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const baseModel = require('./Beneficio');
const _ = require('lodash');

module.exports = _.merge({}, baseModel, {
  attributes: {
    monto: {
      type: 'number'
    }
  }
});
