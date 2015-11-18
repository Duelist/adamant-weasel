'use strict';

var parse = require('co-body'),
    models = require('../models');

module.exports.create = function * create() {
  var body = yield parse(this),
      user = yield models.User.create({
        name: body['name'],
        password: body['password'],
        email: body['email']
      });

  this.body = user;
};

module.exports.update = function * update(id) {
  var body = yield parse(this),
      user = yield models.User.findById(id);

  if (user === null) {
    return this.throw(404, 'User not found');
  }

  user = yield user.update({
    name: body['name'],
    password: body['password']
  });

  this.body = user;
};

module.exports.head = function *(){
  return;
};
