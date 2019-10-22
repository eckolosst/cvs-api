/**
 * SolicitudPrestamoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /* Se debe verificar que el socio exista, que la antigüedad sea la adecuada y que tenga la cuota por afiliación al
   * día. Además el socio no debe tener otra solicitud vigente. No debe adeudar cuotas de afiliación;
   */
  create: async (req, res) => {
    const idSocio = req.param('idSocio');
    const socio = await Socio.findOne({ id: idSocio });
    if (socio) {
      const auxDate = new Date();
      auxDate.setMonth(auxDate.getMonth() - 12);
      if (socio.fechaNacimiento > auxDate) {
        let query = `SELECT id, socio
                        FROM SolicitudTerreno as t INNER JOIN SolicitudPrestamo as p
                        WHERE t.socio=${idSocio} OR p.socio=${idSocio}`;
        const solicitudes = await sails.sendNativeQuery(query);
        //TODO: Terminar consulta que trae un beneficio que el socio esté pagando aún, es decir no tiene estado saldado
        query = `SELECT id, socio
                    FROM Prestamo as p INNER JOIN Venta as v
                    WHERE (t.socio=${idSocio} AND ) OR (v.socio=${idSocio})`;
        const beneficios = await sails.sendNativeQuery(query);
        if (solicitudes.length === 0 || beneficios.length === 0) {
          // TODO: Verificar que datos entran al crear la solicitud
          // TODO: Tabién deberian controlarse los datos del garante. Si es un garante nuevo, agregarlo
        } else {
          return res.status(200).send('El socio posee un beneficio o solicitud pendiente.');
        }
      } else {
        return res.status(200).send('El socio no posee la antigüedad suficiente.');
      }
    } else {
      return res.status(404).send('Socio no encontrado.');
    }
  },
  aprobarSolicitud: (req, res) => {
    var solicitudId = req.param('_id');

    if (!_.isNumeric(solicitudId)) {
      return res.badRequest(new Error('Error en el id de la solicitud'));
    }

    let SolicitudPrestamoItem = SolicitudPrestamo.findOne({ id: solicitudId });

    if (!SolicitudPrestamoItem) {
      return res.badRequest(new Error('Error al encontrar la solicitud'));
    }

    SolicitudPrestamoItem.updateOne({ resultado: 'Aprobado' });
    SolicitudPrestamoItem.updateOne({ fechaAprobacionRechazo: new Date() });

    return res.send('succes');
  },
  rechazarSolicitud: (req, res) => {
    var solicitudId = req.param('_id');

    if (!_.isNumeric(solicitudId)) {
      return res.badRequest(new Error('Error en el id de la solicitud'));
    }

    let SolicitudPrestamoItem = SolicitudPrestamo.findOne({ id: solicitudId });

    if (!SolicitudPrestamoItem) {
      return res.badRequest(new Error('Error al encontrar la solicitud'));
    }

    SolicitudPrestamoItem.updateOne({ resultado: 'Rechazada' });
    SolicitudPrestamoItem.updateOne({ fechaAprobacionRechazo: new Date() });

    return res.send('succes');
  }
};
