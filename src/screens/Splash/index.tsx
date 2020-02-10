import React from 'react';
import {View, Image} from 'react-native';
import logoWhite from '../../assets/logoWhite.png';
import bgLight from '../../assets/bgLight.png';
import styles from './styles';
import {ScreenContainer} from '../../components';

const Splash = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={{width: '100%', height: '100%'}}>
          <Image style={styles.bgLight} source={bgLight} />
          <Image style={styles.logo} source={logoWhite} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Splash;
