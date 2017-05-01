'use strict'
/* global describe, it */
const assert = require('assert')

describe('Form Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Form'])
  })
})
