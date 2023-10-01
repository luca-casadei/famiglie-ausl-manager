import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../components/Home';
import ProfiloFamiglia from '../components/ProfiloFamiglia';

//Screen names
const homeName = "Home";
const profiloName = "Profilo";

const Tab = createBottomTabNavigator();

//Componente per la gestione della TabBar
function HomeContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profiloName) {
              iconName = focused ? 'person' : 'person-outline';
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        })}
        >

        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={profiloName} component={ProfiloFamiglia} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeContainer;