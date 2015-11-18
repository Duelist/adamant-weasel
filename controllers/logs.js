'use strict';

var parse = require('co-body'),
    models = require('../models'),
    kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client(),
    producer = new Producer(client);

/*
 * POST /log
 * Send a log with action id, user id and data to kafka server
 */
module.exports.create = function * create() {
  var body = yield parse(this),
      payloads = [
        {
          topic: 'test',
          messages: [
            body['action_id'],
            body['user_id'],
            body['data']
          ].join(','),
          parition: 0
        }
      ];

  // Ensure all arguments are supplied before moving on
  if (!(body['action_id'] && body['user_id'] && body['data'])) {
    return this.throw(400, 'Missing arguments.');
  }

  // Sends a message to the kafka server with supplied data
  producer.send(payloads, function (err, data) {});

  this.body = 'Done!';
};
