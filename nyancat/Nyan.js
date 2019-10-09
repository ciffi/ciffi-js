const nyan = require('./nyan')

module.exports = new (class Nyan {
  constructor() {}

  start(options) {
    this.nyanCat = nyan.pipe({
      speed: options.speed,
      colors: options.colors,
      pure: options.pure,
      stream: options.stream
    })
  }

  stop() {
    clearInterval(this.nyanCat)
  }
})()
