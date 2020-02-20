import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar, Image} from 'react-native';
import styles from './styles';
import {postLogin} from '../../api/user';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/actions/userActions';
import {ScreenContainer, Input, Touchable} from '../../components';
import Button from '../../components/Button';
import logoWhite from '../../assets/logoWhite.png';
import {Colors} from '../../utils/values';
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const doctor = true;

  const [username, setUsername] = React.useState<string>(
    doctor ? 'phil' : 'admina',
  );
  const [password, setPassword] = React.useState<string>(
    doctor ? 'mcgraw' : 'admin',
  );

  function login() {
    postLogin(username, password) //doctor
      .then(user => {
        dispatch(signInAction(user));
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  return (
    <ScreenContainer status={{backgroundColor: Colors.primary}}>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <Image style={styles.loginLogo} source={logoWhite} />
          </View>

          <Input
            value={username}
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: '100',
              marginVertical: 20,
            }}
            placeholder="Nom d'utilisateur"
          />
          <Input
            value={password}
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: '100',
              marginVertical: 20,
              marginBottom: 40,
            }}
            placeholder="Mot de passe"
            secureTextEntry
          />
          <Button onPress={login} text="Login" light />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Login;
