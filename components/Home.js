import {Text,FlatList,View, StyleSheet, Pressable} from 'react-native'

const nomeMenuInvernale='Menù invernale'
const nomeMenuEstivo='Menù estivo'

//Pagina in cui mostrare i bambini associati all'utente he ha effettuato l'accesso 
const Home =({route,navigation}) => {
    const params = {
        codiceFiscale : route.params.value.codiceFiscale,
        password : route.params.value.password,
    }
    return(
        <View style={styles.container}>
            <Text>Selezionare il menù che si vuole visualizzare</Text>
            <FlatList
                data={[
                {key: nomeMenuInvernale},
                {key: nomeMenuEstivo},
                ]}
                renderItem={({item}) => <><Pressable style={styles.button} onPress={() => menuSelezionato(item.key)}><Text style={styles.buttonText}>{item.key}</Text></Pressable></>}
            />
        </View>
    );
} 
const menuSelezionato = (nomeMenu) => {
    console.log(nomeMenu);
    if(nomeMenu == nomeMenuEstivo){
        console.log('estivo');
    }
    else if(nomeMenu == nomeMenuInvernale){
        console.log('invernale');
    }
}

const styles = StyleSheet.create({
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
    container: {
        alignItems:'center',
        flex: 1,
        paddingTop: 22,
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Home;