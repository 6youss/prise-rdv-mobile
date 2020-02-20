import React from 'react';
import {View, Text, Alert, Image, Button} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {tokenSelector} from '../../redux/selectors';
import {ScreenContainer, Avatar, Touchable} from '../../components';
import {getSessionDetails} from '../../api/sessions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ISessionDetails} from '../../types';
import {getStringFromDate} from '../../utils/date';
import defaultProfile from '../../assets/defaultProfile.jpg';
import {Colors} from '../../utils/values';
import GoBack from '../../components/GoBack';

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
        // Alert.alert('ahum', JSON.stringify(sessionDetails));
      })
      .catch(error => {
        Alert.alert('Oops!', error.message);
      });
  }

  if (!sessionDetails) return null;

  const [date, hour] = getStringFromDate(
    new Date(sessionDetails.date),
    true,
  ).split('T');

  return (
    <ScreenContainer
      status={{backgroundColor: Colors.lightGray, barStyle: 'dark-content'}}>
      <View style={styles.container}>
        <GoBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.date}>{`Le ${date} à ${hour}`}</Text>
        <View style={styles.cardContainer}>
          <Avatar source={defaultProfile} />
          <View style={styles.cardRight}>
            <Text style={styles.cardTexts}>
              {sessionDetails?.patientDetails.firstName}
            </Text>
            <Text style={styles.cardTexts}>
              {sessionDetails?.patientDetails.lastName}
            </Text>
          </View>
          <Text style={styles.seeMore}>{'Fiche patient'}</Text>
        </View>
        <View style={styles.pushToBottom}>
          <Touchable
            containerStyle={{marginBottom: 20}}
            borderRadius={20}
            style={styles.button}>
            <Text style={styles.buttonText}>Do something</Text>
          </Touchable>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SessionDetail;
