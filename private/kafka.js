'use strict';

var fs = require('fs'),
    kafka = require('kafka-node');

var Producer = kafka.Producer,
    Consumer = kafka.Consumer,
    producer_client = new kafka.Client(),
    consumer_client = new kafka.Client(),
    producer = new Producer(producer_client),
    consumer = new Consumer(consumer_client, []);

producer.on('ready', function () {
  // Create test topic on producer and add topic to consumer
  producer.createTopics(['test'], false, function () {});
  consumer.addTopics(['test'], function () {});

  // Set up consumer to write to a log file when it receives messages
  consumer.on('message', function (message) {
    fs.appendFile('logs/app.log', message.value + '\n', function () {});
  });
});

module.exports = {
  producer: producer,
  consumer: consumer
};
