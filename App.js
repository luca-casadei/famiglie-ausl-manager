import { StyleSheet} from "react-native";
import Login from "./components/Login";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeContainer from "./TabBar/HomeContainer";

const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Pagina di Login"
        component={Login}>
        </Stack.Screen>
        <Stack.Screen
        name="HomeContainer"
        component={HomeContainer}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
export default App;