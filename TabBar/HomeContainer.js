import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../components/Home';
import ProfiloFamiglia from '../components/ProfiloFamiglia';
import Login from '../components/Login';

//Screen names
const homeName = "Home";
const profileName = "Profilo";
const logoutName = "Logout"

const Tab = createBottomTabNavigator();

//Componente per la gestione della TabBar
const HomeContainer = ({navigation}) =>{
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

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            } 
            else if(rn === logoutName){
              iconName = focused ? 'log-out' : 'log-out-outline'
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
        <Tab.Screen name={profileName} component={ProfiloFamiglia} />
        <Tab.Screen name={logoutName} component={Login} listeners={{
              tabPress: e => {
                e.preventDefault()
                Alert.alert('Attenzione', 'L\'account verrà disconnesso!', [
                  {
                    text: 'Annulla',
                    onPress: () => console.log('Logout annullato'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK', onPress: () => {console.log('Logout effettuato'); navigation.navigate('Login');}
                  },
                ]);
              }
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeContainer;