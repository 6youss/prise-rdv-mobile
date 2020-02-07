import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

const ScreenContainer: React.FC = ({children}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>{children}</SafeAreaView>
    </>
  );
};

export default ScreenContainer;
