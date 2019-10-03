import Router from '../src/scripts/modules/Router'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('Application router home', () => {
  document.body.innerHTML = '<div class="js-app" data-route="home"></div>'

  const router = new Router()

  expect(router.currentRoute).toBe('home')
})

test('Application router editorial page', () => {
  const router = new Router()

  expect(router.currentRoute).toBe('')
})

test('Application router empty page', () => {
  document.body.innerHTML = '<div class="js-app" data-route="empty"></div>'

  const router = new Router()

  expect(router.currentRoute).toBe('empty')
})
