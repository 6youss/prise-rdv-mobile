import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from '../utils/values';

const ScreenContainer: React.FC = ({children}) => {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.primaryDark}
        barStyle="light-content"
      />
      <SafeAreaView>{children}</SafeAreaView>
    </>
  );
};

export default ScreenContainer;
