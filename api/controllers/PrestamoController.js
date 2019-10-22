/**
 * PrestamoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    /* Debe existir la solicitud correspondiente; además, el socio no debe tener otro préstamo vigente. Debe
        verificarse que el valor del préstamo esté permitido para ese socio según la tabla de ingresos, y que el
        garante cumpla los requisitos.
    */
  }
};
