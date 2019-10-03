// config
import Config from 'Config'
// device
import '@ciffi-js/device'
// router
import Router from '../modules/Router'

export default new class Application {
  constructor() {
    this.config = Config

    new Router({
      config: this.config
    })
  }
}()
