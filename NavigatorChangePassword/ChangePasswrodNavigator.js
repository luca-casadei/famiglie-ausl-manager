import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';

const Stack = createNativeStackNavigator();

//Componente per la gestione della TabBar
const ChangePasswordNavigator = ({navigation}) =>{
return(
    <NavigationContainer independent={true} >
    <Stack.Navigator initialRouteName="Profile"  screenOptions={{ headerShown: false, }}>
    <Stack.Screen        
        name="Profile"
        component={Profile}>
        </Stack.Screen>
        <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}>
        </Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
)
}
export default ChangePasswordNavigator;