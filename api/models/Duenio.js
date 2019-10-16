/**
 * Duenio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    dni: {
      type: 'string'
    },
    apellido: {
      type: 'string'
    },
    nombre: {
      type: 'string'
    },
    fechaNacimiento: {
      type: 'ref',
      columnType: 'datetime'
    },
    domicilio: {
      type: 'string'
    },
    email: {
      type: 'string',
      isEmail: true,
      unique: true
    },
    telefono: {
      type: 'string'
    }
  }
};
