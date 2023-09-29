const Login = ({navigation}) => {
    return (
      <Button
        title="Passa alla home"
        onPress={() =>
          navigation.navigate('Home', {name: 'Prova'})
        }
      />
    );
};

export default Login;