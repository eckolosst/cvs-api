/**
 * SolicitudPrestamo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fechaPeticion: {
      type: 'ref',
      columnType: 'datetime'
    },
    fechaAprobacionRechazo: {
      type: 'ref',
      columnType: 'datetime'
    },
    resultado: {
      type: 'string',
      isIn: ['aprobada', 'desaprobada', 'pendiente']
    },
    socio: {
      model: 'socio'
    },
    garante: {
      model: 'garante'
    },
    recibos: {
      collection: 'reciboSueldo',
      via: 'solicitudPrestamo'
    },
    monto: {
      type: 'number'
    }
  }
};
