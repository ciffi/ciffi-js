/*export const getMainRoute = el => {
  const _el = document.querySelector(el);
  if (!_el) {
    return '';
  }
  return _el.dataset.route.split('/')[0];
};*/

export const getCurrentRoute = el => {
  const _el = document.querySelector(el);
  if (!_el) {
    return '';
  }
  return _el.dataset.route;
};

class Router {
  constructor(props = {}) {
    const { el = '.js-app', currentRoute } = props;
    
    this.el = el;
    this.currentRoute = currentRoute || getCurrentRoute(this.el);
    
    const pageProps = {
      ...props,
      el: this.el,
      currentRoute: this.currentRoute
    };
    
    switch (this.currentRoute) {
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

export default Router;
