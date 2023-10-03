import {useState} from 'react'
//Pagina in cui è possibile modificare le informazioni sul bambino, email e password
import {Text,TextInput,View, StyleSheet,Platform, Pressable,TouchableOpacity} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';

//Pagina in cui mostrare i bambini associati all'utente he ha effettuato l'accesso 
const Profile =() => {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascita, setDataNascita] = useState('');

    const [data, setData] = useState(new Date());
    const [showPicker,setShowPicker] = useState(false);

    //Metodi per DatePicker
    const attivaDatePicker=()=>{
        setShowPicker(!showPicker);
    }

    const onChange=({type}, dataSelezionata)=>{
        if(type=="set"){
            setData(dataSelezionata);

            if(Platform.OS == "android"){
                attivaDatePicker();
                setDataNascita(dataSelezionata.toDateString());
            }
        }else{
            attivaDatePicker();
        }
    }

    const confermaDataIOS=()=>{
        setDataNascita(data.toDateString());
        attivaDatePicker();
    }

    // const formattadata=(data)=>{
    //     let anno = data.getFullYear();
    //     let mese = data.getMonth()+1;
    //     let giorno = data.getDay();
        
    //     mese = mese<10?'0'+{mese}:{mese}
    //     giorno = giorno<10?'0'+{giorno}:{giorno}

    //     return {giorno}+'/'+{mese}+'/'+{anno}
    // }

    //Metodo submit
    const confermaDati = () => {
        alert('nome -> '+{nome}+'cognome'+{cognome}+'Data Nascita'+{dataNascita}+'email'+{email});
    }

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
            <Text style={styles.text}>Data di nascita</Text>
            {showPicker && Platform.OS=="android" &&
            (<DateTimePicker
            mode='date'
            display='spinner'
            value={data}
            onChange={onChange}
            />
            )}

            <Text style={styles.text}Data di nascita></Text>
            {!showPicker && Platform.OS =="android" && (<Pressable onPress={attivaDatePicker}>
                <TextInput
                    style={styles.input}
                    placeholder='Inserire data di nascita'
                    value={dataNascita}
                    onChangeText={setDataNascita}
                    editable={false}
                ></TextInput>
            </Pressable>
            )}

            
            {showPicker && Platform.OS==="ios" &&
            (<DateTimePicker
            mode='date'
            display='spinner'
            value={data}
            onChange={onChange}
            style={styles.datePicker}
            />
            )}
            

            {!showPicker && Platform.OS ==="ios" &&
            (
                <TextInput
                    style={styles.input}
                    placeholder='Inserire data di nascita'
                    value={dataNascita}
                    onChangeText={setDataNascita}
                    editable={false}
                    onPressIn={attivaDatePicker}
                ></TextInput>
            )}

            {showPicker && Platform.OS === "ios" &&
            (
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <TouchableOpacity style={[style.button,style.pickerButton]} onPress={attivaDatePicker}>
                        <Text style={styles.buttonText}>Cancella</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button,style.pickerButton]} onPress={confermaDataIOS}>
                        <Text style={styles.buttonText}>Conferma</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='e-mail'
                onChangeText={setEmail}
            />
            <Pressable style={styles.button} onPress={() => confermaDati()}>
                <Text>Conferma Dati</Text>
            </Pressable>
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
    },
    datePicker:{
        height:120,
        marginTop:-10
    },
    pickerButton:{
        paddingHorizontal:20
    }
});
export default Profile;