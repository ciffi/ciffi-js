export default class Routes {
  static load(currentRoute, pageProps) {
    switch (currentRoute) {
      case 'home':
        import(/*webpackChunkName: 'Home' */ '../controllers/pages/Home').then(module => module.default.init(pageProps));
        break;
      case 'empty':
        import(/*webpackChunkName: 'Page' */ '../controllers/Page').then(module => module.default.init(pageProps));
        break;
      default:
        import(/*webpackChunkName: 'Editorial' */ '../controllers/pages/Editorial').then(module => module.default.init(pageProps));
    }
  }
}
