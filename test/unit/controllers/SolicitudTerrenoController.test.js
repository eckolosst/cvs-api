var supertest = require('supertest');

require('../../bootstrap');

describe('SolicitudTerrenoController', () => {
  before(done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/socio')
      .set('Accept', 'application/json')
      .send({
        dni: '91.843.346',
        nombre: 'Solomon',
        apellido: 'Deare',
        fechaNacimiento: '2018/9/10',
        domicilio: '8 Arkansas Plaza',
        email: 'sdeare2@netlog.com',
        telefono: '53360'
      })
      .end((err, res) => {
        if (err) console.log(err);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/reciboSueldo')
          .set('Accept', 'application/json')
          .send({
            sueldoNeto: 55000,
            sueldoBruto: 60000,
            cuil: '654987',
            garante: null,
            socio: res.body.id,
            solicitudTerreno: null,
            solicitudPrestamo: null
          })
          .end((err, res) => {
            done();
          });
      });
  });

  it('should create a SolicitudTerreno', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
              // Se debería hacer otros 2 get para traer al garante y el recibo de sueldo y controlarlos
              result.body.should.be.an('object');
              result.body.should.have.property('id');
              result.body.should.have.property('fechaPeticion');
              result.body.should.have.property('resultado');
              result.body.should.have.property('loteo');
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

  it('should fail to post SolicitudTerreno, user not found', done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/solicitudTerreno')
      .set('Accept', 'application/json')
      .send({
        fechaPeticion: '2019-11-19T15:49:41.684Z',
        resultado: 'pendiente',
        socio: 987654321,
       loteo: 1,
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

  it('should fail to post SolicitudTerreno, user id is null', done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/solicitudTerreno')
      .set('Accept', 'application/json')
      .send({
        fechaPeticion: '2019-11-19T15:49:41.684Z',
        resultado: 'pendiente',
        socio: null,
       loteo: 1,
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

  it('should fail to post SolicitudTerreno, invalid garante', done => {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/solicitudTerreno')
      .set('Accept', 'application/json')
      .send({
        fechaPeticion: '2019-11-19T15:49:41.684Z',
        resultado: 'pendiente',
        socio: 987654321,
       loteo: 1,
        garante: {
          dni: "",
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
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          result.body.should.be.an('object');
          done();
        }
      });
  });

  it('should fail to post SolicitudTerreno, invalid loteo', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: -1,
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

  it('should fail to post SolicitudTerreno, invalid period', done => {
    Socio.findOne({ dni: '91.843.346' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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

  it('should fail to post SolicitudTerreno, pending request', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
            // var agent = supertest.agent(sails.hooks.http.app);
            agent
              .post('/solicitudTerreno')
              .set('Accept', 'application/json')
              .send({
                fechaPeticion: '2019-11-19T15:49:41.684Z',
                resultado: 'pendiente',
                socio: socio.id,
                loteo: 1,
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
                result2.body.should.be.an('object');
                SolicitudPrestamo.destroy({ id: result1.body.id }).then(() => {
                  done();
                });
              });
          });
      })
      .catch(done);
  });

  after(done => {
    Socio.destroy({ dni: '91.843.346' })
      .fetch()
      .exec((err, socio) => {
        Periodo.destroy({ socio: socio[0].id }).exec((err, p) => {
          ReciboSueldo.destroy({ socio: socio[0].id }).exec((err, r) => {
            done();
          });
        });
      });
  });

  it('should fail to post SolicitudTerreno, invalid sueldoNetoGarante is negative', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
              sueldoNeto: -1,
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

  it('should fail to post SolicitudTerreno, invalid sueldoNetoGarante is null', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
              sueldoNeto: null,
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

  it('should fail to post SolicitudTerreno, invalid sueldoBrutoGarante is negative', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
              sueldoBruto: -1,
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

  it('should fail to post SolicitudTerreno, invalid sueldoBrutoGarante is null', done => {
    Socio.findOne({ dni: '90.621.035' })
      .then(socio => {
        // sails.log.info(socio);
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/solicitudTerreno')
          .set('Accept', 'application/json')
          .send({
            fechaPeticion: '2019-11-19T15:49:41.684Z',
            resultado: 'pendiente',
            socio: socio.id,
            loteo: 1,
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
              sueldoBruto: null,
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

  /*
    Fallar al obtener un socio deudor - Error
    Fallar al obtener un socio que ya tiene un terreno. - Error
    Fallar al obtener un socio que ya tiene un préstamo. - Error
  */
});
