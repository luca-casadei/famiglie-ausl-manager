import {useState} from 'react'
import {Text,TextInput, StyleSheet,Pressable,Image,KeyboardAvoidingView} from 'react-native'

const tabBarName = "HomeContainer";

const Login =({navigation}) => {
    const [codiceFiscale, setCodice] = useState('');
    const [password, setPassword] = useState('');
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.areaView}> 
            <Image 
            style={styles.image}
            source={require('../images/Logo.png')}></Image>
            <Text style={styles.text}>Inserisci il codice fiscale</Text>
            <TextInput
                style={styles.input}
                placeholder='codice fiscale'
                onChangeText={setCodice}
            />
            <Text style={styles.text}>Inserisci la password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='password'
                maxLength={20}
                onChangeText={setPassword}
            />
            <Text style={styles.link} onPress={()=>{alert('TODO')}}>Password dimenticata?</Text>
            <Pressable style={styles.button} onPress={()=>VerificaCredenziali(navigation,codiceFiscale,password)}>
                <Text style={styles.buttonText}>Accedi</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
} 

//Metodo per vefica presenza delle credenziali inserite nel db degli utenti famiglia
VerificaCredenziali = async (navigation,cod,passwd)=>{
    console.log(cod);
    console.log(passwd);
    try{
        var data = new URLSearchParams();
        data.append('codiceFiscale', cod);
        data.append('password', passwd);
        const response = await fetch('https://apis-pari-o-dispari.azurewebsites.net/kidlogin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: data.toString(),
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
          response.json().then((parsedObject) =>{
            navigation.navigate('HomeContainer',{token:parsedObject.token});
          })
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
      height: 40,
      width:300,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    text:{
        fontWeight:'bold',
        padding:10,
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
        backgroundColor: 'gray',
    }
});

export default Login;