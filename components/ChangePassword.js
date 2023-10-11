import {useState} from 'react'
import { View ,Text,TextInput,Pressable,StyleSheet} from "react-native"

const ChangePassword = ({route,navigation})=>{
    console.log(route.params);
    const params = {
        codiceFiscale : route.params.password.codiceFiscale,
        password : route.params.password.password,
    }

    const [vecchiaPassword,setVecchiaPassword] = useState('');
    const [nuovaPassword,setNuovaPassword] = useState('');
    const [confermaPassword,setConfermaPassword] = useState('');

    const tornaIndietro = () => {
        navigation.navigate('Profile');
    }

    const ConfermaPassword=()=>{
        //Da fare query per reperimento password, sulla vecchia password va fatta la crittografia prima del confronto
        //Torno alla pagina Profile 
        if(vecchiaPassword != params.password){
            alert('La password da modificare inserita è diversa da quella corrente');
        }
        else if(nuovaPassword === confermaPassword){
            //Passo sia la nuova password che il codice fiscale per fare la set sul bambino
            modificaPassword(nuovaPassword,params.codiceFiscale);
            navigation.navigate('Profile');
        }
        else if(nuovaPassword !== confermaPassword){
            alert('La nuova password è diversa dalla conferma');
        }
    }

    return(
        <View style={styles.areaView}>
            <Text style={styles.text}>Vecchia password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setVecchiaPassword}
                secureTextEntry={true}
            />

            <Text style={styles.text}>Nuova password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNuovaPassword}
                secureTextEntry={true}
            />

            <Text style={styles.text}>Conferma nuova password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setConfermaPassword}
                secureTextEntry={true}
            />
            <Pressable style={styles.buttonChangePassword} onPress={() => ConfermaPassword()}>
                <Text style={styles.buttonText}>Cambia password</Text>
            </Pressable> 
            <Pressable style={styles.button} onPress={() => tornaIndietro()}>
                <Text style={styles.buttonText}>Annulla</Text>
            </Pressable>     
        </View>
    )
}

const modificaPassword =async(password,codiceFiscale)=>{
    try{
        const response = await fetch('https://apis-pari-o-dispari.azurewebsites.net/setkidpassword', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            codiceFiscale:codiceFiscale,
            password:password,
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
        case 200:{
            alert('Password modificata');
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
      borderRadius: 10,
      color:'black'
    },
    text:{
        fontWeight:'bold',
        paddingTop:10,
        paddingBottom:10,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        fontWeight:'bold',
    },
    button: {
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal:20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'gray',
    },
    buttonChangePassword: {
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal:20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'red',
    },
});

export default ChangePassword;