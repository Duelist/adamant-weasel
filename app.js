'use strict';

var fs = require('fs'),
    koa = require('koa'),
    route = require('koa-route'),
    models = require('./models'),
    logs = require('./controllers/logs'),
    users = require('./controllers/users'),
    app = koa();

// Routes
app.use(route.post('/log', logs.create));
app.use(route.post('/classes/user', users.create));
app.use(route.put('/classes/user/:id', users.update));

module.exports = app;

if (!module.parent) {
  app.listen(3000);
}
