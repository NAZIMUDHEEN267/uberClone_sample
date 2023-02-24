import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from './src/screens/HomeScreen';
import store from './src/redux/store';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <HomeScreen />
        </SafeAreaProvider>
      </Provider>
    )
  }
}

export default App;