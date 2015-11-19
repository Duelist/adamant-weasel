'use strict';

var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize');

var basename = path.basename(module.filename),
    db_url = 'postgres:///adamant-weasel',
    sequelize = new Sequelize(db_url, {
      dialect: 'postgres',
      protocol: 'postgres',
      port: 5432,
      logging: false,
      define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
