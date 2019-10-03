import Routes from 'Routes'

/*export const getMainRoute = el => {
  const _el = document.querySelector(el)
  if (!_el) {
    return ''
  }
  return _el.dataset.route.split('/')[0]
}*/

export const getCurrentRoute = el => {
  const _el = document.querySelector(el)
  if (!_el) {
    return ''
  }
  return _el.dataset.route
}

export default class Router {
  constructor(props = {}) {
    const { el = '.js-app', currentRoute } = props

    this.el = el
    this.currentRoute = currentRoute || getCurrentRoute(this.el)

    const pageProps = {
      ...props,
      el: this.el,
      currentRoute: this.currentRoute
    }

    Routes.load(this.currentRoute, pageProps)
  }
}
