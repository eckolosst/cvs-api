/**
 * Socio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    numeroSocio: {
      type: 'number',
      unique: 'true'
    },
    // cuotas: {
    //   collection: 'cuota',
    //   via: 'socio'
    // },
    // periodoAfiliacion: Periodo;
    inicioPeriodo: {
      type: 'ref',
      columnType: 'datetime'
    },
    finPeriodo: {
      type: 'ref',
      columnType: 'datetime'
    }
  }
};
