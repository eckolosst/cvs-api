var supertest = require('supertest');

require('../../bootstrap');

describe('SolicitudPrestamoController', () => {
  it('should create a SolicitudPrestamo', done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/solicitudPrestamo')
      .set('Accept', 'application/json')
      .send({
        /* datos de la solicitud */
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          /* Se debería hacer otros 2 get para traer al garante y el recibo de sueldo y controlarlos */
          result.body.should.be.an('object');
          result.body.should.have.property('id');
          result.body.should.have.property('fechaPeticion');
          result.body.should.have.property('resultado');
          result.body.should.have.property('monto');
          result.body.should.have.property('socio');
          result.body.should.have.property('garante');
          done();
        }
      });
  });

  it('should get all SolicitudPrestamo items', done => {});

  it('should delete a SolicitudPrestamo', done => {});
});
