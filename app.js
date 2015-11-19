'use strict';

var koa = require('koa'),
    route = require('koa-route'),
    models = require('./models'),
    logs = require('./controllers/logs'),
    users = require('./controllers/users');

var app = koa();

// Routes
app.use(route.post('/log', logs.create));
app.use(route.post('/classes/user', users.create));
app.use(route.put('/classes/user/:id', users.update));

module.exports = app;

if (!module.parent) {
  models.sequelize.sync({ force: true }).then(function () {
    models.User.create({
      name: 'Ian',
      password: 'testpass',
      email: 'iantest@test.com'
    });
  });

  app.listen(3000);
}
