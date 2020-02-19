import React from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {
  doctorSelector,
  tokenSelector,
  sessionsSelector,
} from '../../redux/selectors';
import {ScreenContainer} from '../../components';
import {setSearchedDoctorSessionsAction} from '../../redux/actions/sessionsActions';
import {getSessionDetails} from '../../api/sessions';

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SessionDetail'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'SessionDetail'>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
  route: ProfileScreenRouteProp;
};
const SessionDetail: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();

  const accessToken = useSelector(tokenSelector);
  const sessionId = route.params.id;

  React.useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
    getSessionDetails(accessToken, sessionId)
      .then(sessionDetails => {
        Alert.alert('hh', JSON.stringify(sessionDetails));
      })
      .catch(error => {
        Alert.alert('Oops!', error.message);
      });
  }

  return (
    <ScreenContainer>
      <Text>ahum ahum</Text>
    </ScreenContainer>
  );
};

export default SessionDetail;
