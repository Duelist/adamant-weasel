var should = require('should'),
    app = require('../app.js'),
    models = require('../models'),
    request = require('supertest')(app.listen(3000));


before(function (done) {
  models.sequelize.sync({ force: true }).then(function () {
    models.User.create({
      name: 'Ian',
      password: 'testpass',
      email: 'ianbenedict@gmail.com'
    }).then(function () {
      done();
    });
  });
});


describe('POST /log', function () {
  it('Should respond with a 200 while adding a log entry to logs/app.log', function (done) {
    request
      .post('/log')
      .send({
        'action_id': 'TEST_ACTION_ID',
        'user_id': 1,
        'data': 'Hello.'
      })
      .expect(200)
      .end(done);
  });
  it('Should respond with a 400 if incorrect arguments are given', function (done) {
    request
      .post('/log')
      .expect(400)
      .send({})
      .end(done);
  });
});


describe('POST /classes/user', function () {
  it('Should respond with a user object', function (done) {
    request
      .post('/classes/user')
      .send({
        'name': 'Mr. Test',
        'password': 'testpass',
        'email': 'testemail@testemail.com'
      })
      .expect(200)
      .end(done);
  });
  it('Should respond with a 400 if incorrect arguments are given', function (done) {
    request
      .post('/classes/user')
      .expect(400)
      .send({})
      .end(done);
  });
});


describe('PUT /classes/user/:id', function () {
  it('Should respond with an updated user object', function (done) {
    request
      .put('/classes/user/1')
      .send({
        'name': 'Mr. Test',
        'password': 'testpass'
      })
      .expect(200)
      .end(done);
  });
  it('Should respond with a 400 if incorrect arguments are given', function (done) {
    request
      .put('/classes/user/1')
      .expect(400)
      .send({})
      .end(done);
  });
});
