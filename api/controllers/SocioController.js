/**
 * SocioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getSociosAptosPrestamos: (req, res) => {
    let socios = Socio.find({});
  },

  create: async (req, res) => {
    let dataSocio = req.body;
    sails.log.info(req.body.nombre);
    try {
      const period = await Periodo.create({ fechaInicio: new Date() }).fetch();
      dataSocio.periodoAfiliacion = period.id;
      let newSocio = await Socio.create(dataSocio).fetch();
      return res.ok(newSocio);
    } catch (err) {
      return res.serverError(err);
    }
  }
};
