/**
 * Prestamo.js
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
      collection: 'estadoBeneficio',
      via: 'prestamo'
    },
    garante: {
      model: 'garante'
    },
    monto: {
      type: 'number'
    },
    solicitudPrestamo: {
      model: 'solicitudPrestamo'
    },
    referencia: {
      model: 'TabladeReferencias'
    }
  }
};
