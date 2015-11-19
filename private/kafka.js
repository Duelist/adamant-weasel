'use strict';

var fs = require('fs'),
    kafka = require('kafka-node'),
    Producer = kafka.Producer,
    Consumer = kafka.Consumer,
    producer_client = new kafka.Client(),
    consumer_client = new kafka.Client(),
    producer = new Producer(producer_client),
    consumer = new Consumer(consumer_client, []);

producer.on('ready', function () {
  // Create test topic on producer and add topic to consumer
  producer.createTopics(['test'], false, function (err, data) {});
  consumer.addTopics(['test'], function (err, added) {});

  // Set up consumer to write to a log file when it receives messages
  consumer.on('message', function (message) {
    fs.appendFile('logs/app.log', message['value'] + '\n', function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
});

module.exports = {
  producer: producer,
  consumer: consumer
};
