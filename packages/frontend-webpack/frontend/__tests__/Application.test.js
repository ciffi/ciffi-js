import Config from 'Config';
import Application from '../src/scripts/controllers/Application';

const App = new Application();

test('Application return Config', () => {
  expect(App.config.projectName).toBe(Config.projectName);
});