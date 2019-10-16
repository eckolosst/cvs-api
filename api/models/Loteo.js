/**
 * Loteo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    ubicacion: {
      type: 'string'
    },
    nombre: {
      type: 'string'
    },
    terrenosDisponibles: {
      type: 'number'
    },
    terrenos: {
      collection: 'terreno',
      via: 'loteo'
    },
    duenios: {
      model: 'duenio',
      // via: 'duenio'
    }
  }
};
