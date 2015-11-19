'use strict';

var parse = require('co-body'),
    rekwest = require('co-request'),
    models = require('../models');

/*
 * POST /classes/user
 * Creates a new user with name, password and email arguments
 */
module.exports.create = function * create() {
  var that = this,
      body = yield parse(that);

  // Ensure all arguments are supplied before moving on
  if (!(body.name && body.password && body.email)) {
    return that.throw(400, 'Missing arguments.');
  }

  // Creates a user if model validation works out
  var user = yield models.User.create({
        name: body.name,
        password: body.password,
        email: body.email
      }).catch(function () {
        return that.throw(400, 'Invalid arguments.');
      });

  // Send a log request
  rekwest.post(
    'http://localhost:3000/log',
    {
      form: {
        action_id: 'USER_SIGNUP',
        user_id: user.id,
        data: JSON.stringify(body)
      }
    }
  );

  that.body = user;
};

/*
 * PUT /classes/user/:id
 * Updates user name and password
 */
module.exports.update = function * update(id) {
  var that = this,
      body = yield parse(that);

  // Ensures a valid id was supplied
  if (!id) {
    return that.throw(404);
  }

  var user = yield models.User.findById(id).catch(function () {
    return that.throw(400, 'Invalid id.');
  });

  // Ensures a user was found
  if (!user) {
    return that.throw(404, 'User not found');
  }

  // Ensure all arguments are supplied before moving on
  if (!(body.name && body.password)) {
    return that.throw(400, 'Arguments cannot be empty.');
  }

  // Updates the user with supplied arguments
  user = yield user.update({
    name: body.name,
    password: body.password
  });

  // Send a log request
  rekwest.post(
    'http://localhost:3000/log',
    {
      form: {
        action_id: 'USER_EDIT_PROFILE',
        user_id: user.id,
        data: JSON.stringify(body)
      }
    }
  );

  that.body = user;
};
