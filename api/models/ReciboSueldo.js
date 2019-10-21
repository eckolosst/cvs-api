/**
 * ReciboSueldo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    sueldoNeto: {
      type: 'number'
    },
    sueldoBruto: {
      type: 'number'
    },
    cuil: {
      type: 'string'
    },
    garante: {
      model: 'garante'
    },
    socio: {
      model: 'socio'
    },
    solicitudTerreno: {
      model: 'solicitudterreno'
    },
    solicitudPrestamo: {
      model: 'solicitudprestamo'
    }
  }
};
