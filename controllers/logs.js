'use strict';

var models = require('../models'),
    kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

module.exports.create = function * create(post_data) {
  payloads = [
    {
      topic: 'test',
      messages: {
        action_id: post_data['action_id'],
        user_id: post_data['user_id'],
        data: post_data['data']
      }
    },
  ];

  producer.on('ready', function () {
    producer.send(payloads, function (err, data) {

    });
  });

  this.body = 'Done!';
};
