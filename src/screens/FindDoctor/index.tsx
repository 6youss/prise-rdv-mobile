import React from 'react';
import {SafeAreaView, ScrollView, Text, StatusBar} from 'react-native';
import styles from './styles';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>Find Doctor Screen</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
