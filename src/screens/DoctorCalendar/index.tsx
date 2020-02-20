import React from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {
  doctorSelector,
  tokenSelector,
  sessionsSelector,
} from '../../redux/selectors';
import {ScreenContainer} from '../../components';
import SessionPicker, {
  onDayPressFunction,
} from '../../components/SessionPicker';
import {setSearchedDoctorSessionsAction} from '../../redux/actions/sessionsActions';
import {getDoctorSessions} from '../../api/sessions';
import {Colors} from '../../utils/values';
import {addDays} from '../../utils/date';

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorCalendar'
>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
};
const DoctorCalendar: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);
  const sessions = useSelector(sessionsSelector);
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

  const handleDayPress: onDayPressFunction = (day, hour) => {
    if (hour.id) {
      navigation.navigate('SessionDetail', {id: hour.id});
    } else {
      throw new Error('unexpected undefined session id');
    }
  };

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 2));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -2));
  }

  return (
    <ScreenContainer
      status={{backgroundColor: Colors.white, barStyle: 'dark-content'}}
      safeArea={{style: {backgroundColor: Colors.white}}}>
      <Text style={styles.calendarTitle}>Votre calendrier de visites</Text>
      <View style={styles.sessionPickerContainer}>
        <SessionPicker
          currentDate={currentDay}
          reverseFilter
          sessions={sessions}
          onDayPress={handleDayPress}
          onArrowLeftPress={handleLeftPress}
          onArrowRightPress={handleRightPress}
        />
      </View>
    </ScreenContainer>
  );
};

export default DoctorCalendar;
