export default class Routes {
  static load(currentRoute, pageProps) {
    switch (currentRoute) {
      case 'home':
        import(/*webpackChunkName: 'Home' */ '../scripts/controllers/pages/Home').then(
          module => module.default.init(pageProps)
        )
        break
      case 'empty':
        import(/*webpackChunkName: 'Page' */ '../scripts/controllers/Page').then(
          module => module.default.init(pageProps)
        )
        break
      default:
        import(/*webpackChunkName: 'Editorial' */ '../scripts/controllers/pages/Editorial').then(
          module => module.default.init(pageProps)
        )
    }
  }
}
