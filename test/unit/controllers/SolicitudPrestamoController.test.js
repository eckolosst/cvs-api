var supertest = require('supertest');

require('../../bootstrap');

describe('SolicitudPrestamoController', () => {
  before(done => {
    // Socio.create({
    //   dni: '91.843.346',
    //   nombre: 'Solomon',
    //   apellido: 'Deare',
    //   fechaNacimiento: '2018/9/10',
    //   domicilio: '8 Arkansas Plaza',
    //   email: 'sdeare2@netlog.com',
    //   telefono: '53360'
    // }).then(newSocio => {
    //   ReciboSueldo.create({
    //     sueldoNeto: 55000,
    //     sueldoBruto: 60000,
    //     cuil: '654987',
    //     garante: null,
    //     socio: newSocio.id,
    //     solicitudTerreno: null,
    //     solicitudPrestamo: null
    //   });
    // });
    // Valor.create({
    //   sueldoNetoMinimo: 50000,
    //   valorMaximoPrestamo: 25000,
    //   valorMaximoTerreno: 0,
    //   numeroInteres: 15,
    //   monto: 0,
    //   aplicacion: 'prestamo'
    // });
    done();
  });

  it('should create a SolicitudPrestamo', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudPrestamo')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            monto: 14000,
            garante: {
              dni: 24123345,
              apellido: 'Garante',
              nombre: 'Nuevo',
              fechaNacimiento: '1974-07-11T03:00:00.000Z',
              domicilio: 'JM alvarez 123',
              email: 'test@garante.com',
              telefono: 498123876
            },
            recibos: {
              sueldoNeto: 50000,
              sueldoBruto: 55000,
              cuil: '123456'
            }
          })
          // .expect('Content-Type', /text\/html/)
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
              SolicitudPrestamo.destroy({ id: result.body.id }).then(() => {
                done();
              });
            }
          });
      })
      .catch(done);
  });

  it('should fail to post SolicitudPrestamo, user not found', done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/solicitudPrestamo')
      .set('Accept', 'application/json')
      .send({
        fechaPeticion: '2019-11-19T15:49:41.684Z',
        resultado: 'pendiente',
        socio: 987654321,
        monto: 14000,
        garante: {
          dni: 24123345,
          apellido: 'Garante',
          nombre: 'Nuevo',
          fechaNacimiento: '1974-07-11T03:00:00.000Z',
          domicilio: 'JM alvarez 123',
          email: 'test@garante.com',
          telefono: 498123876
        },
        recibos: {
          sueldoNeto: 50000,
          sueldoBruto: 55000,
          cuil: '123456'
        }
      })
      .expect('Content-Type', /text\/html/)
      .expect(404)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          result.body.should.be.an('object');
          done();
        }
      });
  });

  it('should fail to post SolicitudPrestamo, invalid amount', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudPrestamo')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            monto: 9999999,
            garante: {
              dni: 24123345,
              apellido: 'Garante',
              nombre: 'Nuevo',
              fechaNacimiento: '1974-07-11T03:00:00.000Z',
              domicilio: 'JM alvarez 123',
              email: 'test@garante.com',
              telefono: 498123876
            },
            recibos: {
              sueldoNeto: 50000,
              sueldoBruto: 55000,
              cuil: '123456'
            }
          })
          .expect('Content-Type', /text\/html/)
          // .expect('Content-Type', /json/)
          .expect(400)
          .end((err, result) => {
            if (err) {
              done(err);
            } else {
              result.body.should.be.an('object');
              done();
            }
          });
      })
      .catch(done);
  });

  /* it('should fail to post SolicitudPrestamo, pending request', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudPrestamo')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            monto: 14000,
            garante: {
              dni: 24123345,
              apellido: 'Garante',
              nombre: 'Nuevo',
              fechaNacimiento: '1974-07-11T03:00:00.000Z',
              domicilio: 'JM alvarez 123',
              email: 'test@garante.com',
              telefono: 498123876
            },
            recibos: {
              sueldoNeto: 50000,
              sueldoBruto: 55000,
              cuil: '123456'
            }
          })
          // .expect('Content-Type', /text\/html/)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, result1) => {
            if (err) {
              done(err);
            } else {
              agent
                .post('/solicitudPrestamo')
                .set('Accept', 'application/json')
                .send({
                  fechaPeticion: '2019-11-19T15:49:41.684Z',
                  resultado: 'pendiente',
                  socio: socio.id,
                  monto: 14000,
                  garante: {
                    dni: 24123345,
                    apellido: 'Garante',
                    nombre: 'Nuevo',
                    fechaNacimiento: '1974-07-11T03:00:00.000Z',
                    domicilio: 'JM alvarez 123',
                    email: 'test@garante.com',
                    telefono: 498123876
                  },
                  recibos: {
                    sueldoNeto: 50000,
                    sueldoBruto: 55000,
                    cuil: '123456'
                  }
                })
                // .expect('Content-Type', /text\/html/)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, result2) => {
                  if (err) {
                    done(err);
                  }
                  result2.body.should.be.an('object');
                  SolicitudPrestamo.destroy({ id: result1.body.id }).then(() => {
                    done();
                  });
                });
            }
          });
      })
      .catch(done);
  }); */

  /* it('should get all SolicitudPrestamo items', done => {});

  it('should delete a SolicitudPrestamo', done => {}); */
});
