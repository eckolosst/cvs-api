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
    const dni = req.param('dni');
    const nombre = req.param('nombre');
    const apellido = req.param('apellido');
    const fechaNacimiento = req.param('fechaNacimiento');
    const domicilio = req.param('domicilio');
    const email = req.param('email');
    const telefono = req.param('telefono');
    try {
      const period = await Periodo.create({ fechaInicio: new Date() }).fetch();
      let newSocio = await Socio.create({
        dni,
        nombre,
        apellido,
        fechaNacimiento,
        domicilio,
        email,
        telefono,
        periodoAfiliacion: period.id
      }).fetch();
      return res.ok(newSocio);
    } catch (err) {
      return res.serverError(err);
    }
  }
};
