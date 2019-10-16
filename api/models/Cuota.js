/**
 * Cuota.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    monto: {
      type: 'number'
    },
    fechaVencimiento: {
      type: 'ref',
      columnType: 'datetime'
    },
    fechaEmision: {
      type: 'ref',
      columnType: 'datetime'
    },
    saldoPendiente: {
      type: 'number'
    },
    estado: {
      type: 'string',
      isIn: ['cancelada', 'noCancelada']
    },
    socio: {
      model: 'socio',
    }
  }
};
