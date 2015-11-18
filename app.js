'use strict';

var koa = require('koa'),
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
          topic: 'test'
        }
      ],
      {
        autoCommit: false
      }
    );

app.use(route.post('/log', logs.create));
app.use(route.post('/classes/user', users.create));
app.use(route.put('/classes/user/:id', users.update));

models.sequelize.sync({ force: true }).then(function () {
  models.User.create({
    name: 'Duelist',
    password: '$2a$10$p9yFI0kQNAT3GyTb4PPlku6Oko0n2n8rFbb2LTx16Syn54KyX4ofi',
    email: 'ianbenedict@gmail.com'
  });
});

consumer.on('message', function (message) {
  console.log(message);
});

app.listen(3000);
