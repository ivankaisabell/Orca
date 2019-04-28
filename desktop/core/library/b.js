'use strict'

const Operator = require('../operator')

function OperatorB (orca, x, y, passive) {
  Operator.call(this, orca, x, y, 'b', passive)

  this.name = 'bounce'
  this.info = 'Bounces between two values based on the runtime frame.'

  this.ports.haste.rate = { x: -1, y: 0, clamp: { min: 1 } }
  this.ports.input.mod = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true }

  this.run = function () {
    const rate = this.listen(this.ports.haste.rate, true)
    const mod = this.listen(this.ports.input.mod, true) - 1
    const key = (Math.floor(orca.f / rate) % (mod * 2))
    const res = orca.keyOf(key <= mod ? key : mod - (key - mod))
    this.output(`${res}`)
  }
}

module.exports = OperatorB
