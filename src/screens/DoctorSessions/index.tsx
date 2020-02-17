import React from 'react';
import {View, Text, Alert} from 'react-native';

import {ScreenContainer} from '../../components';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, IDoctor} from '../../types';
import styles from './styles';
import SessionPicker from '../../components/SessionPicker';
import {ZHour} from '../../utils/zdate';
import {useSelector} from 'react-redux';
import {doctorSelector} from '../../redux/selectors';
import {RootState} from '../../redux/reducers';
import {Colors} from '../../utils/values';

type DoctorSessionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorSessions'
>;

type Props = {
  navigation: DoctorSessionsScreenNavigationProp;
};

const DoctorSessions: React.FC<Props> = () => {
  const doctor = useSelector(doctorSelector);

  function handleDayPress(date: string, hour: ZHour) {
    Alert.alert('ahum', date + hour.toString());
  }

  return (
    <ScreenContainer>
      <Text
        style={{
          color: Colors.primaryDark,
          fontSize: 15,
          alignItems: 'center',
          textAlign: 'center',
          padding: 10,
        }}>
        {`Pr. ${doctor.firstName} ${doctor.lastName}`}
      </Text>

      <SessionPicker
        onDayPress={handleDayPress}
        dayCount={3}
        sessions={{
          '01-02-2020': [],
          '02-02-2020': ['09:00', '10:30'],
          '03-02-2020': ['10:00', '11:30'],
          '04-02-2020': ['10:00', '11:30'],
          '05-02-2020': ['10:00', '11:30'],
          '06-02-2020': ['10:00', '11:30'],
        }}
      />
    </ScreenContainer>
  );
};

export default DoctorSessions;
