import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import styles from './styles';
import {login} from '../../api/user';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/actions/userActions';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      login('admina', 'admin')
        .then(user => {
          dispatch(signInAction(user));
        })
        .catch(error => {
          console.log(error.message);
        });
    }, 3000);
  }, [dispatch]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Login screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
