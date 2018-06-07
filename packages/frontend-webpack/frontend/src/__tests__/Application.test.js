import Config from 'Config';
import Application from '../scripts/controllers/Application';

const App = new Application();

test('Application return Config', () => {
  expect(App.config.projectName).toBe(Config.projectName);
});