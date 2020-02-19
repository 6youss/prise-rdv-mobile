import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Router';
import {useSelector} from 'react-redux';
import {doctorSelector} from '../../redux/selectors';
import {ScreenContainer} from '../../components';

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorHome'
>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
};
const DoctorHome: React.FC<Props> = () => {
  const doctor = useSelector(doctorSelector);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text>{`What's up doc ${doctor.firstName} ${doctor.lastName}`}</Text>
      </View>
    </ScreenContainer>
  );
};

export default DoctorHome;
