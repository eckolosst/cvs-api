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
    const idSocio = req.body.socio;
    const garante = req.body.garante;
    let recibos = req.body.recibos;
    const monto = req.body.monto;
    const resultado = req.body.resultado;
    const socio = await Socio.findOne({ id: idSocio });
    if (socio) {
      let auxDate = new Date();
      auxDate.setMonth(auxDate.getMonth() - 12);
      const periodos = await Periodo.find({ socio: idSocio });
      // Verifico si el último periodo de afiliación tiene fecha de inicio de hace más de un añó
      if (periodos[periodos.length - 1].fechaInicio >= auxDate) {
        // Busco solicitudes o beneficios pendientes del socio
        let query = `SELECT t.id, p.id
                        FROM solicitudterreno as t JOIN solicitudprestamo as p
                        WHERE (t.socio=${idSocio} AND t.resultado='pendiente')
                        OR (p.socio=${idSocio} AND p.resultado='pendiente')`;
        const solicitudes = await sails.sendNativeQuery(query);

        query = `SELECT p.id
                    FROM prestamo as p
                    INNER JOIN estadobeneficio e ON p.id=e.prestamo
                    WHERE p.socio=${idSocio} AND e.estado='pendiente'`;
        const prestamos = await sails.sendNativeQuery(query);

        query = `SELECT v.id
                    FROM venta as v
                    INNER JOIN estadobeneficio e ON v.id=e.prestamo
                    WHERE v.socio=${idSocio} AND e.estado='pendiente'`;
        const ventas = await sails.sendNativeQuery(query);

        if (solicitudes.rows.length === 0) {
          if (prestamos.rows.length === 0 || ventas.rows.length === 0) {
            let g = await Garante.findOne({ dni: garante.dni });
            if (!g) {
              g = await Garante.create(garante).fetch();
              // TODO: Verificar e Insertar los recibos de sueldo
              recibos.garante = g.id;
              await ReciboSueldo.create(recibos);
            }
            const solicitud = await SolicitudPrestamo.create({
              fechaPeticion: new Date(),
              fechaAprobacionRechazo: null,
              resultado,
              socio: idSocio,
              garante: g.id,
              recibos: [],
              monto
            });
            return res.ok(solicitud);
          } else {
            return res.status(400).send('El socio posee un beneficio pendiente.');
          }
        } else {
          return res.status(400).send('El socio posee una solicitud pendiente.');
        }
      } else {
        return res.status(400).send('El socio no posee la antigüedad suficiente.');
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