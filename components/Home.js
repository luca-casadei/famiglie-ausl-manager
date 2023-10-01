import {Text,FlatList,View, StyleSheet, Pressable} from 'react-native'

//Pagina in cui mostrare i bambini associati all'utente he ha effettuato l'accesso 
const Home =({navigation}) => {
    return(
        <View style={styles.container}>
            <FlatList
                data={[
                {key: 'Bambino 1'},
                {key: 'Bambino 2'},
                {key: 'Bambino 3'},
                {key: 'Bambino 4'},
                ]}
                renderItem={({item}) => <><Pressable style={styles.button}><Text style={styles.buttonText}>{item.key}</Text></Pressable></>}
            />
        </View>
    );
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