import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from 'C:\Users\elena\Desktop\PROGETTO AUSL\famiglie-pari-o-dispari\Login.js';
import {Home} from 'C:\Users\elena\Desktop\PROGETTO AUSL\famiglie-pari-o-dispari\Home.js';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='Login'
        component={Login}
        options={{title:'Login'}}>
        </Stack.Screen>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{title:'Home'}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;