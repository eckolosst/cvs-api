/**
 * EstadoBeneficio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    numero: {
      type: 'number',
      unique: 'true'
    },
    fecha: {
      type: 'ref',
      columnType: 'datetime'
    },
    beneficio: {
      model: 'beneficio'
    }
  }
};
