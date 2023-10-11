import {useState} from 'react'
import {Text,TextInput, StyleSheet,Pressable,Image,KeyboardAvoidingView, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const tabBarName = "HomeContainer";

const Login =({navigation}) => {
    const [codiceFiscale, setCodice] = useState('');
    const [password, setPassword] = useState('');
    const [showHidePassword, setShowHidePassword] = useState(false);

    mostraPassword = () =>{
      setShowHidePassword(!showHidePassword);
    }
    //Metodo per vefica presenza delle credenziali inserite nel db degli utenti famiglia
VerificaCredenziali = async (navigation,cod,passwd)=>{
  const codiceFiscale = cod.trim();
  const password = passwd.trim();
  try{
      const response = await fetch('https://apis-pari-o-dispari.azurewebsites.net/kidlogin', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          codiceFiscale:cod,
          password: password,
        }),
        json:true,
    })
    console.log(response.status);
    switch(response.status){
      case 502:{
        alert("Errore interno, database non raggiungibile.");
        break;
      }
      case 404:{
        alert("Utente non trovato");
        break;
      }
      case 400:{
        alert("Credenziali invalide");
        break;
      }
      case 200:{
          setCodice('');
          setPassword('');
          navigation.navigate(tabBarName,{codiceFiscale:cod,password:passwd});
        break; 
      }
      default:{
        alert("Errore non gestito.");
        break;
      }
    }
    }catch(err)
    {
        console.log(err.message);
    }
  }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.areaView}> 
            <Image 
            style={styles.image}
            source={require('../images/Logo.png')}></Image>
            <Text style={styles.text}>Inserisci il codice fiscale</Text>
            <TextInput
                style={styles.input}
                placeholder='codice fiscale'
                value={codiceFiscale}
                onChangeText={setCodice}
            />
            <Text style={styles.text}>Inserisci la password</Text>
            <View style={styles.container}>
              <TextInput
                  secureTextEntry={!showHidePassword}
                  placeholder='password'
                  maxLength={20}
                  value={password}
                  styles={styles.input}
                  onChangeText={setPassword}
              />
              <Ionicons 
                    name={showHidePassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={()=> mostraPassword()} 
                /> 
            </View>
            
            <Text style={styles.link} onPress={()=>{alert('TODO')}}>Password dimenticata?</Text>
            <Pressable style={styles.button} onPress={()=>VerificaCredenziali(navigation,codiceFiscale,password)}>
                <Text style={styles.buttonText}>Accedi</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
} 

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    areaView:{
        flex:0.8,
        justifyContent:'center',
        alignItems:'center',
    },
    input: {
      textAlign:'center',
      height: 45,
      width:300,
      margin: 10,
      fontSize:15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    text:{
        fontWeight:'bold',
        padding:10,
        fontSize:15
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    link:{
        color:'blue',
        marginTop:20,
        textDecorationLine:'underline',
    },
    button: {
        marginTop:15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal:20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'green',
    },
    container:{
      flexDirection:"row", 
      margin: 10,
      textAlign:'center',
      height: 45,
      width:300,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    icon:{
      marginLeft: 10, 
    }
});

export default Login;