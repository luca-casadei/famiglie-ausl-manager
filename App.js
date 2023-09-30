import { View, Text ,StyleSheet,SafeAreaView} from "react-native";
import Home from "./components/Home";
import Login from "./components/Login";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
        name="Home"
        component={Home}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  ///Aggiungi qui stili
});
export default App;