import React from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {tokenSelector} from '../../redux/selectors';
import {ScreenContainer} from '../../components';
import {getSessionDetails} from '../../api/sessions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ISessionDetails} from '../../types';

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SessionDetail'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'SessionDetail'>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const SessionDetail: React.FC<Props> = ({route}) => {
  const accessToken = useSelector(tokenSelector);
  const sessionId = route.params.id;
  const [sessionDetails, setSessionDetails] = React.useState<
    ISessionDetails | undefined
  >(undefined);

  React.useEffect(() => {
    fetchSession();
  }, []);

  function fetchSession() {
    getSessionDetails(accessToken, sessionId)
      .then(sessionDetails => {
        setSessionDetails(sessionDetails);
        Alert.alert('ahum', JSON.stringify(sessionDetails));
      })
      .catch(error => {
        Alert.alert('Oops!', error.message);
      });
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Icon name="arrow-left" />
        <Text style={styles.date}>{sessionDetails?.date}</Text>
        <Text>{sessionDetails?.patientDetails?.firstName}</Text>
        <Text>{sessionDetails?.patientDetails?.lastName}</Text>
      </View>
    </ScreenContainer>
  );
};

export default SessionDetail;
