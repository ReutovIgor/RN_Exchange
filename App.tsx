/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import About from './src/Components/About';
import Ticker from './src/Components/Ticker';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Tickers" component={Ticker} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
