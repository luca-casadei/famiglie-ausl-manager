import {useState} from 'react'
//Pagina in cui è possibile modificare le informazioni sul bambino, email e password
import {Text,TextInput,View, StyleSheet,Button} from 'react-native'

import DatePicker from 'react-native-date-picker'
//Pagina in cui mostrare i bambini associati all'utente he ha effettuato l'accesso 
const Profile =() => {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState(new Date())
    const [open, setOpen] = useState(false)
    return(
        <View style={styles.areaView}>
            <Text style={styles.text}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder='Mattia'
                onChangeText={setNome}
            />
            <Text style={styles.text}>Cognome</Text>
            <TextInput
                style={styles.input}
                placeholder='Rossi'
                onChangeText={setCognome}
            />
            <Button title="Data di nascita" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={data}
                onConfirm={(date) => {
                setOpen(false)
                setData(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='e-mail'
                onChangeText={setEmail}
            />
        </View>
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
export default Profile;