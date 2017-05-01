'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')

module.exports = class ProxyFormsTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {
    return Promise.all([
      lib.ProxyForms.configure(this.app),
      lib.ProxyForms.addPolicies(this.app),
      lib.ProxyForms.addRoutes(this.app),
      lib.ProxyForms.copyDefaults(this.app),
      lib.ProxyForms.addCrons(this.app),
      lib.ProxyForms.addEvents(this.app),
      lib.ProxyForms.addTasks(this.app)
    ])
  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

