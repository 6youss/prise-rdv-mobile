import React from 'react';
import {Text, Alert, View} from 'react-native';

import {ScreenContainer} from '../../components';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import styles from './styles';
import SessionPicker from '../../components/SessionPicker';
import {ZTime} from '../../utils/ztime';
import {useSelector, useDispatch} from 'react-redux';
import {
  doctorSelector,
  patientSelector,
  tokenSelector,
  sessionsSelector,
} from '../../redux/selectors';
import {postSession, getDoctorSessions} from '../../api/sessions';
import {getDateFromString, addDays} from '../../utils/date';
import {setSearchedDoctorSessionsAction} from '../../redux/actions/sessionsActions';
import {Colors} from '../../utils/values';

type DoctorSessionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorSessions'
>;

type Props = {
  navigation: DoctorSessionsScreenNavigationProp;
};

const ReserveSession: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);
  const doctor = useSelector(doctorSelector);
  const sessions = useSelector(sessionsSelector);
  const accessToken = useSelector(tokenSelector);
  const [currentDay, setCurrentDay] = React.useState<Date>(new Date());

  React.useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
    getDoctorSessions(accessToken, doctor._id)
      .then(sessions => {
        dispatch(setSearchedDoctorSessionsAction(sessions));
      })
      .catch(error => {
        Alert.alert('Oops!', error.message);
      });
  }

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 2));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -2));
  }

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
                fetchSessions();
                Alert.alert('Success', `session prise avec succes`);
              })
              .catch(error => {
                Alert.alert('Oops!', error.message);
              });
          },
        },
        {text: 'Annuler'},
      ],
    );
  }

  return (
    <ScreenContainer
      status={{backgroundColor: Colors.white, barStyle: 'dark-content'}}
      safeArea={{style: {backgroundColor: Colors.white}}}>
      <Text style={styles.headerText}>
        {`Visite chez  Pr. ${doctor.firstName} ${doctor.lastName}`}
      </Text>
      <View
        style={{
          elevation: 20,
          borderRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          marginHorizontal: 15,
          overflow: 'hidden',
          flex: 1,
        }}>
        <SessionPicker
          currentDate={currentDay}
          onDayPress={handleDayPress}
          dayCount={3}
          sessions={sessions}
          onArrowLeftPress={handleLeftPress}
          onArrowRightPress={handleRightPress}
          onRefresh={fetchSessions}
        />
      </View>
    </ScreenContainer>
  );
};

export default ReserveSession;
