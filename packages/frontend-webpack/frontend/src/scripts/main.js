import { general, localServer } from 'Settings'

// styles
import(/* webpackChunkName: 'Styles' */ '../styles/main.scss').then(() => {
  document.body.style.opacity = 1
})

// application
import(/* webpackChunkName: 'Application' */ './controllers/Application').then()

// webpack HMR support
if (localServer.useHMR && module.hot) {
  module.hot.accept()
}

// offline support
if (general.offline) {
  import(/* webpackChunkName: 'Offline' */ './modules/Offline').then()
}
