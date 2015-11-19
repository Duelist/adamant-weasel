'use strict';

var koa = require('koa'),
    route = require('koa-route'),
    logs = require('./controllers/logs'),
    users = require('./controllers/users');

var app = koa();

// Routes
app.use(route.post('/log', logs.create));
app.use(route.post('/classes/user', users.create));
app.use(route.put('/classes/user/:id', users.update));

module.exports = app;

if (!module.parent) {
  app.listen(3000);
}
