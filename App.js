/**
 * developer: Maksym Orshak
 * email: maxorshak@gmail.com
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Home from './src/components/Home'

class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <SafeAreaView>
          <Home />
        </SafeAreaView>
      </>
    );
  }
}

export default App;