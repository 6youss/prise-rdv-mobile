import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Router';
import {useSelector, useDispatch} from 'react-redux';
import {doctorSelector} from '../../redux/selectors';
import {ScreenContainer, Avatar} from '../../components';
import {Colors} from '../../utils/values';
import GoBack from '../../components/GoBack';
import {screenWidth} from '../../utils/dimentions';
import Button from '../../components/Button';
import {signOutAction} from '../../redux/actions/userActions';

type DoctorProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorProfile'
>;

type Props = {
  navigation: DoctorProfileScreenNavigationProp;
};
const DoctorProfile: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);

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
            }}>{`Pr. ${doctor.firstName} ${doctor.lastName}`}</Text>
          <Text style={styles.addressText}>{`${doctor.address}`}</Text>
        </View>
        <View style={{alignItems: 'center', padding: 20}}>
          <Text style={styles.phoneText}>{`${doctor.phone}`}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', padding: 20}}>
          <Button
            color={Colors.lightGray}
            light
            text="Disponibilités"
            containerStyle={{marginBottom: 20}}
            onPress={() => {
              navigation.navigate('DoctorAvailablities');
            }}
          />
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

export default DoctorProfile;
