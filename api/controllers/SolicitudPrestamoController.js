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
    const garante = req.param('garante');
    const socio = await Socio.findOne({ id: idSocio });
    if (socio) {
      const auxDate = new Date();
      auxDate.setMonth(auxDate.getMonth() - 12);
      // TODO: Verificación de la fecha de afiliación del socio en vez de fecha de cumpleaños
      if (socio.fechaNacimiento > auxDate) {
        let query = `SELECT t.id, p.id
                        FROM SolicitudTerreno as t JOIN SolicitudPrestamo as p
                        WHERE (t.socio=${idSocio} AND t.resultado='pendiente')
                        OR (p.socio=${idSocio} AND p.resultado='pendiente')`;
        const solicitudes = await sails.sendNativeQuery(query);

        query = `SELECT p.id
                    FROM Prestamo as p
                    INNER JOIN EstadoBeneficio e ON p.id=e.prestamo
                    WHERE p.socio=${idSocio} AND e.estado='pendiente'`;
        const prestamos = await sails.sendNativeQuery(query);

        query = `SELECT v.id
                    FROM Venta as v
                    INNER JOIN EstadoBeneficio e ON v.id=e.prestamo
                    WHERE v.socio=${idSocio} AND e.estado='pendiente'`;
        const ventas = await sails.sendNativeQuery(query);
        if (solicitudes.length === 0) {
          if (prestamos.length === 0 || ventas.length === 0) {
            let g = await Garante.findOne({ dni: garante.dni });
            if (!g) {
              // TODO: Verificar e Insertar los recibos de sueldo
              g = await Garante.create({ garante });
            }

          } else {
            return res
              .status(400)
              .send('El socio posee un beneficio pendiente.');
          }
        } else {
          return res
            .status(400)
            .send('El socio posee una solicitud pendiente.');
        }
      } else {
        return res
          .status(400)
          .send('El socio no posee la antigüedad suficiente.');
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
