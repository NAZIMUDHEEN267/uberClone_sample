import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from './src/redux/store';
import MainNavigator from './src/navigator';

export class App extends Component {
  componentDidUpdate() {
    const subscribe = store.subscribe(() => {
      console.log(store.getState());
    })
    subscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </Provider>
    )
  }
}

export default App;