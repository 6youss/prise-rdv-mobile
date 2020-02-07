import React from 'react';
import {SafeAreaView, View, Image, StatusBar} from 'react-native';
import logoDark from '../../assets/logoDark.png';
import styles from './styles';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Image style={styles.logo} source={logoDark} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
