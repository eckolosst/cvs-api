/**
 * Contrato.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fecha: {
      type: 'ref',
      columnType: 'datetime'
    },
    valor: {
      type: 'number'
    },
    montoInicial: {
      type: 'number'
    },
    Escribano: {
      model: 'escribano'
    }
  }
};
