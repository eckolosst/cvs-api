/**
 * PlanDeCuotas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    cantidadCuotas: {
      type: 'number'
    },
    montoCuota: {
      type: 'number'
    },
    tasa: {
      type: 'number'
    }
  }
};
