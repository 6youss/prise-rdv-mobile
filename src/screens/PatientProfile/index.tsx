import React from 'react';
import {View, Text, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {tokenSelector, patientSelector} from '../../redux/selectors';
import {ScreenContainer, Avatar} from '../../components';
import {Colors} from '../../utils/values';
import GoBack from '../../components/GoBack';
import Button from '../../components/Button';
import {signOutAction} from '../../redux/actions/userActions';
import styles from './styles';

type PatientProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PatientProfile'
>;

type Props = {
  navigation: PatientProfileScreenNavigationProp;
};
const PatientProfile: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);
  const accessToken = useSelector(tokenSelector);

  return (
    <ScreenContainer
      status={{backgroundColor: Colors.primary, barStyle: 'light-content'}}
      safeArea={{style: {backgroundColor: Colors.primary}}}>
      <View style={{backgroundColor: Colors.primary, padding: 20}}>
        <GoBack
          color={Colors.white}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: 30,
          backgroundColor: Colors.white,
          padding: 20,
          paddingBottom: 50,
          position: 'relative',
          marginBottom: -30,
          marginHorizontal: 20,
          elevation: 40,
        }}>
        <View style={{alignItems: 'center'}}>
          <Avatar style={{margin: 20}} />
          <Text
            style={{
              color: Colors.darkGray,
              fontWeight: 'bold',
              margin: 7,
            }}>{`${patient.firstName} ${patient.lastName}`}</Text>
        </View>
        <View style={{alignItems: 'center', padding: 20}}></View>
        <View style={{flex: 1, justifyContent: 'flex-end', padding: 20}}>
          <Button
            text="Se déconnecter"
            onPress={() => {
              dispatch(signOutAction());
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default PatientProfile;
