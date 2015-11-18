'use strict';

var fs = require('fs'),
    koa = require('koa'),
    route = require('koa-route'),
    kafka = require('kafka-node'),
    models = require('./models'),
    logs = require('./controllers/logs'),
    users = require('./controllers/users'),
    app = koa(),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
      client,
      [
        {
          topic: 'test',
          partition: 0
        }
      ],
      {
        autoCommit: false
      }
    );

// Routes
app.use(route.post('/log', logs.create));
app.use(route.post('/classes/user', users.create));
app.use(route.put('/classes/user/:id', users.update));

// Initialize sequelize with test data
models.sequelize.sync({ force: true }).then(function () {
  models.User.create({
    name: 'Ian',
    password: 'test',
    email: 'ianbenedict@gmail.com'
  });
});

// Set up kafka consumer to write to a log file when it receives messages
consumer.on('message', function (message) {
  fs.appendFile('logs/app.log', message['value'] + '\n', function (err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log('Log file updated.');
});

app.listen(3000);
