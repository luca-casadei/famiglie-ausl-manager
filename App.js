import { View, Text } from "react-native";
import Home from "./Home";
import Login from "./Login";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <>
    <View>
      <Login></Login>
    </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Login"
        component={Login}>
        </Stack.Screen>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{prova:"prova"}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
export default App;