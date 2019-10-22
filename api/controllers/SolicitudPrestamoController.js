/**
 * SolicitudPrestamoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    aprobarSolicitud: (req, res) => {
        var solicitudId = req.param('_id');

        if (!_.isNumeric(solicitudId)) {
            return res.badRequest(new Error('Error en el id de la solicitud'));
          }

        let SolicitudPrestamoItem = SolicitudPrestamo.findOne({id:solicitudId});

        if(!SolicitudPrestamoItem){
            return res.badRequest(new Error('Error al encontrar la solicitud'));
        }

        SolicitudPrestamoItem.updateOne({resultado: 'Aprobado'});
        SolicitudPrestamoItem.updateOne({fechaAprobacionRechazo: new Date()})

        return res.send("succes")
      }
  ,
      rechazarSolicitud: (req, res) => {
        var solicitudId = req.param('_id');

        if (!_.isNumeric(solicitudId)) {
            return res.badRequest(new Error('Error en el id de la solicitud'));
          }

        let SolicitudPrestamoItem = SolicitudPrestamo.findOne({id:solicitudId});

        if(!SolicitudPrestamoItem){
            return res.badRequest(new Error('Error al encontrar la solicitud'));
        }

        SolicitudPrestamoItem.updateOne({resultado: 'Rechazada'});
        SolicitudPrestamoItem.updateOne({fechaAprobacionRechazo: new Date()})

        return res.send("succes")
      }

};

