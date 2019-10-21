/**
 * EstadoBeneficio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fecha: {
      type: 'ref',
      columnType: 'datetime'
    },
    estado: {
      type: 'string',
      isIn: ['saldado', 'pendiente']
    },
    planDeCuotas: {
      model: 'PlanDeCuotas'
    },
    venta: {
      model: 'Venta'
    },
    prestamo: {
      model: 'prestamo'
    }
  }
};
