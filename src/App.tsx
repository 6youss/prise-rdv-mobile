import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux';
import {Provider} from 'react-redux';
import Router from './Router';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
