'use strict'

const Model = require('trails/model')

/**
 * @module Form
 * @description Form Model
 */
module.exports = class Form extends Model {

  static config (app, Sequelize) {
    let config = {}
    if (app.config.database.orm === 'sequelize') {
      config = {
        options: {
          underscored: true
        }
      }
    }
    return config
  }

  static schema (app, Sequelize) {
    let schema = {}
    if (app.config.database.orm === 'sequelize') {
      schema = {

      }
    }
    return schema
  }
}
