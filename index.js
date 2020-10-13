/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setConsole} from 'react-query';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

AppRegistry.registerComponent(appName, () => App);
