/**
 * SolicitudTerrenoController
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

        let SolicitudTerrenoItem = SolicitudTerreno.findOne({id:solicitudId});

        if(!SolicitudTerrenoItem){
            return res.badRequest(new Error('Error al encontrar la solicitud'));
        }

        SolicitudTerreno.updateOne({resultado: 'Aprobado'});
        SolicitudTerrenoItem.updateOne({fechaAprobacionRechazo: new Date()})

        return res.send("succes")
      }
  ,
      rechazarSolicitud: (req, res) => {
        var solicitudId = req.param('_id');

        if (!_.isNumeric(solicitudId)) {
            return res.badRequest(new Error('Error en el id de la solicitud'));
          }

        let SolicitudTerrenoItem = SolicitudTerreno.findOne({id:solicitudId});

        if(!SolicitudTerrenoItem){
            return res.badRequest(new Error('Error al encontrar la solicitud'));
        }

        SolicitudTerrenoItem.updateOne({resultado: 'Rechazada'});
        SolicitudTerrenoItem.updateOne({fechaAprobacionRechazo: new Date()})
        return res.send("succes")
      },


      altaSolicitud:(req,res)=>{
          const fechaPeticion = req.param('fechaPeticion');
          const fechaAprobacionRechazo = req.param('fechaPeticion');
          const resultado = req.param('resultado');
          const socio = req.param('socio');
          const garante = req.param('garante');
          const recibos = req.param('recibos');
          const loteo = req.param('loteo');

      }
  

};
