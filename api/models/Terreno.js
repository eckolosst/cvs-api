/**
 * Terreno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    largo: {
      type: 'number'
    },
    frente: {
      type: 'number'
    },
    direccion: {
      type: 'string'
    },
    valor: {
      type: 'number'
    },
    matricula: {
      type: 'string'
    },
    estado: {
      model: 'estadoTerreno'
    },
    loteo: {
      model: 'loteo'
    }
  }
};
