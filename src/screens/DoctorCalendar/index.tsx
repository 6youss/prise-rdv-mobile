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
import {ScreenContainer, Avatar, Touchable} from '../../components';
import SessionPicker, {
  onHourPressFunction,
} from '../../components/SessionPicker';
import {setSearchedDoctorSessionsAction} from '../../redux/actions/sessionsActions';
import {getDoctorSessions} from '../../api/sessions';
import {Colors, bigShadow} from '../../utils/values';
import {addDays} from '../../utils/zdate';

type DoctorCalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorCalendar'
>;

type Props = {
  navigation: DoctorCalendarScreenNavigationProp;
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

  const handleDayPress: onHourPressFunction = (day, hour) => {
    if (hour.id) {
      navigation.navigate('SessionDetail', {id: hour.id});
    } else {
      throw new Error('unexpected undefined session id');
    }
  };

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 3));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -3));
  }

  return (
    <ScreenContainer
      status={{backgroundColor: Colors.white, barStyle: 'dark-content'}}
      safeArea={{style: {backgroundColor: Colors.white}}}>
      <View style={styles.header}>
        <Text style={styles.calendarTitle}>Votre calendrier de visites</Text>
        <Touchable
          borderRadius={30}
          onPress={() => {
            navigation.navigate('DoctorProfile');
          }}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Avatar radius={35} style={{margin: 5}} />
        </Touchable>
      </View>

      <View
        style={{
          flexGrow: 1,
          marginHorizontal: 20,
          ...bigShadow,
        }}>
        <View
          style={[
            styles.sessionPickerContainer,
            {elevation: bigShadow.elevation},
          ]}>
          <SessionPicker
            filterMode="taken"
            currentDate={currentDay}
            allreadyTakenHours={sessions}
            onHourPress={handleDayPress}
            onArrowLeftPress={handleLeftPress}
            onArrowRightPress={handleRightPress}
            onRefresh={fetchSessions}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default DoctorCalendar;
