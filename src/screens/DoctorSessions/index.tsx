import React from 'react';
import {View, Text, Alert} from 'react-native';

import {ScreenContainer} from '../../components';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, IDoctor} from '../../types';
import styles from './styles';
import SessionPicker from '../../components/SessionPicker';
import {ZTime} from '../../utils/ztime';
import {useSelector} from 'react-redux';
import {
  doctorSelector,
  patientSelector,
  tokenSelector,
} from '../../redux/selectors';
import {Colors} from '../../utils/values';
import {postSession} from '../../api/sessions';
import {getDateFromString} from '../../utils/date';

type DoctorSessionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorSessions'
>;

type Props = {
  navigation: DoctorSessionsScreenNavigationProp;
};

const DoctorSessions: React.FC<Props> = () => {
  const patient = useSelector(patientSelector);
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);

  function handleDayPress(date: string, time: ZTime) {
    Alert.alert(
      'Prendre rendez vous',
      `Confirmer la prise du rendez-vous le ${date} à ${time.toString()} ?`,
      [
        {
          text: 'Confirmer',
          onPress: () => {
            postSession(
              accessToken,
              patient._id,
              doctor._id,
              getDateFromString(`${date}T${time.toString()}`),
            )
              .then(session => {
                Alert.alert('ahum', JSON.stringify(session));
              })
              .catch(session => {
                Alert.alert('ahum', session.message);
              });
          },
        },
        {text: 'Annuler'},
      ],
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.headerText}>
        {`Pr. ${doctor.firstName} ${doctor.lastName}`}
      </Text>

      <SessionPicker
        onDayPress={handleDayPress}
        dayCount={3}
        sessions={{
          '01-02-2020': ['08:00', '08:30', '16:30'],
          '02-02-2020': [],
          '03-02-2020': [],
          '04-02-2020': [],
          '05-02-2020': [],
          '06-02-2020': [],
          '07-02-2020': [],
          '08-02-2020': [],
        }}
      />
    </ScreenContainer>
  );
};

export default DoctorSessions;
