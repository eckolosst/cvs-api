/**
 * Venta.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    socio: {
      model: 'socio',
      unique: 'true'
    },
    estados: {
      model: 'estadobeneficio',
      // via: 'venta'
    },
    garante: {
      model: 'garante'
    },
    pagoInicial: {
      type: 'number'
    },
    terreno: {
      model: 'terreno'
    },
    solicitudTerreno: {
      model: 'solicitudterreno'
    },
    contrato: {
      model: 'contrato'
    }
  }
};
