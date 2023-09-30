import {Button} from 'react-native'


const Login =({navigation}) => {
    return(
    <Button title='Prova Login'
     onPress={()=>{navigation.navigate('Home', {name: 'prova'})}}>
    </Button>
    );
}

export default Login;