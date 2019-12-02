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
    try {
      let newSocio = await Socio.create(dataSocio).fetch();
      const period = await Periodo.create({ fechaInicio: new Date(), socio: newSocio.id }).fetch();
      return res.ok(newSocio);
    } catch (err) {
      return res.serverError(err);
    }
  }
};
