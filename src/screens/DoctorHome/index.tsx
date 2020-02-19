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

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorHome'
>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
};
const DoctorHome: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);
  const sessions = useSelector(sessionsSelector);

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

  return (
    <ScreenContainer>
      <SessionPicker
        reverseFilter
        sessions={sessions}
        onDayPress={handleDayPress}
      />
    </ScreenContainer>
  );
};

export default DoctorHome;
