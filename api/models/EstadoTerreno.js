/**
 * EstadoTerreno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    descripcion: {
      type: 'string'
    },
    fecha: {
      type: 'ref',
      columnType: 'datetime'
    }
  }
};
