/**
 * Periodo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fechaInicio: {
      type: 'ref',
      columnType: 'datetime'
    },
    fechaFin: {
      type: 'ref',
      columnType: 'datetime'
    },
    socio: {
      model: 'socio'
    }
  }
};
