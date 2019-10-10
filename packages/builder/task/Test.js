const jest = require('jest')

module.exports = class Test {
  constructor() {
    this.init()
  }

  init() {
    jest.run()
  }
}
