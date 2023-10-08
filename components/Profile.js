import {useState,useEffect} from 'react'
//Pagina in cui è possibile modificare le informazioni sul bambino, email e password
import {Text,TextInput,View, StyleSheet,Platform, Pressable,TouchableOpacity,KeyboardAvoidingView} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';


//Pagina in cui mostrare i bambini associati all'utente he ha effettuato l'accesso 
const Profile =({route,navigation}) => {
    const params = {
        codiceFiscale : route.params.value.codiceFiscale,
        password : route.params.value.password,
    }

    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascita, setDataNascita] = useState('');

    //Per gestire il caricamento dei dati
    const [getEffettuata, setGet] = useState(false);

    const [data, setData] = useState(new Date());
    const [showPicker,setShowPicker] = useState(false);

    //Viene richiamato all'apertura della pagina
    useEffect(() => {
        if(!getEffettuata){
            getBambino();
            setGet(true);
        }
    });

    getBambino = async() => {
        try{
            var data = new URLSearchParams();
            data.append('codiceFiscale', params.codiceFiscale);
            await fetch('https://apis-pari-o-dispari.azurewebsites.net/getkid', {
                method: 'POST',
                mode: 'cors',
                headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString(),
                json:true,
            }).then(response => response.json())
            .then(response => {
                setNome(response.Nome),
                setCognome(response.Cognome),
                setEmail(response.Email),
                setDataNascita(correggiData(response.DataNascita.substr(0,10)))
            })
        }catch(err)
        {
            console.log(err.message);
        }
    }
    
    const correggiData = (data) =>{
        let anno = data.substr(0,4);
        let mese = data.substr(5,2);
        let giorno = data.substr(8,2);

        mese = mese<10?'0'+mese:mese
        giorno = giorno<10?'0'+giorno:giorno

        return giorno+'/'+mese+'/'+anno
    }

    //Metodi per DatePicker
    const attivaDatePicker=()=>{
        console.log('ok');
        setShowPicker(!showPicker);
    }

    const onChange=({type}, dataSelezionata)=>{
        if(type=="set"){

            setData(dataSelezionata);

            if(Platform.OS == "android"){
                attivaDatePicker();
                setDataNascita(formattaData(dataSelezionata));
            }
        }else{
            attivaDatePicker();
        }
    }

    const confermaDataIOS=()=>{
        setDataNascita(data.toDateString());
        attivaDatePicker();
    }

    const formattaData=(data)=>{
        let anno = data.getFullYear();
        let mese = data.getMonth()+1;
        let giorno = data.getDate();
        
        
        console.log(anno);
        console.log(mese);
        console.log(giorno);
        mese = mese<10?'0'+mese:mese
        giorno = giorno<10?'0'+giorno:giorno

        return giorno+'/'+mese+'/'+anno
    }

    //Metodo submit
    const confermaDati = async() => {
        try{
            var data = new URLSearchParams();
            data.append('codiceFiscale', params.codiceFiscale);
            data.append('nome', nome);
            data.append('cognome', cognome);
            data.append('dataNascita', dataNascita);
            data.append('email', email);
            const response = await fetch('https://apis-pari-o-dispari.azurewebsites.net/setkid', {
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

    const modificaPassword=()=>{
        navigation.navigate('ChangePassword',{password:params});
    }


    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.areaView}>
             <Text style={styles.text}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder='Mattia'
                value={nome}
                onChangeText={setNome}
            />
            <Text style={styles.text}>Cognome</Text>
            <TextInput
                style={styles.input}
                placeholder='Rossi'
                value={cognome}
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
            {!showPicker && Platform.OS =="android" && (<Pressable style={styles.pressable} onPress={attivaDatePicker}>
                <TextInput
                    style={styles.inputDate}
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
                    <TouchableOpacity style={[styles.button,styles.pickerButton]} onPress={attivaDatePicker}>
                        <Text style={styles.buttonText}>Cancella</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,styles.pickerButton]} onPress={confermaDataIOS}>
                        <Text style={styles.buttonText}>Conferma</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.textMail}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='e-mail'
                value={email}
                onChangeText={setEmail}
            />

            
            <Pressable style={styles.buttonChangePassword} onPress={() => modificaPassword()}>
                <Text style={styles.buttonText}>Cambia password</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => confermaDati()}>
                <Text style={styles.buttonText}>Conferma Dati</Text>
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
        flex:0.9,
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
    inputDate:{
      textAlign:'center',
      height: 40,
      width:300,
      color:'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingRight: 10,
    },
    textMail:{
        fontWeight:'bold',
        paddingTop:20, 
        paddingBottom:10       
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
        backgroundColor: 'green',
    },
    buttonChangePassword: {
        marginTop:30,
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
    },
    pressable:{
        textAlign:'center',
        height: 40,
        width:300,
        color:'black',
        marginTop:-30,
    }
});
export default Profile;