/**
 * Valor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    sueldoNetoMinimo: {
      type: 'number'
    },
    valorMaximoPrestamo: {
      type: 'number'
    },
    valorMaximoTerreno: {
      type: 'number'
    },
    numeroInteres: {
      type: 'number'
    },
    monto: {
      type: 'number'
    },
    aplicacion: {
      type: 'string'
    }
  }
};
