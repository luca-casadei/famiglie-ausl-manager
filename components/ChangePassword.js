import {useState} from 'react'
import { View ,Text,TextInput,Pressable,StyleSheet} from "react-native"

const ChangePassword = ({navigation})=>{
    const [vecchiaPassword,setVecchiaPassword] = useState('');
    const [nuovaPassword,setNuovaPassword] = useState('');
    const [confermaPassword,setConfermaPassword] = useState('');

    const tornaIndietro = () => {
        navigation.navigate('Profile');
    }

    const ConfermaPassword=()=>{
        //Da fare query per reperimento password, sulla vecchia password va fatta la crittografia prima del confronto
        //Torno alla pagina Profile 
        let password = 'Pippo';
        
        if(vecchiaPassword != password){
            alert('La password da modificare inserita è diversa da quella corrente');
        }
        else if(nuovaPassword === confermaPassword){
            alert('Cliccare Conferma Dati per cambiare la password');
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