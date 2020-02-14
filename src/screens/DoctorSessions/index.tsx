import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {login} from '../../api/user';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/actions/userActions';

import {ScreenContainer} from '../../components';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import styles from './styles';
import SessionPicker from '../../components/SessionPicker';

type DoctorSessionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorSessions'
>;

type Props = {
  navigation: DoctorSessionsScreenNavigationProp;
};

const DoctorSessions: React.FC<Props> = () => {
  return (
    <ScreenContainer>
      <View style={{height: '100%'}}>
        <SessionPicker
          sessions={{
            '01-02-2020': ['08:00', '08:30'],
            '02-02-2020': ['08:00', '08:30'],
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default DoctorSessions;
