import React from 'react';
import {Text, View, Image, Alert, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ScreenContainer, Input, Touchable} from '../../components';
import styles from './styles';
import {fetchDoctorByPhone} from '../../api/doctor';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader';
import DoctorItem from '../../components/DoctorItem';
import FloatingButton from '../../components/FloatingButton';
import doctorIllustration from '../../assets/doctorIllustration.jpg';
import {Colors} from '../../utils/values';
import {doctorSelector, patientSelector} from '../../redux/selectors';
import {setDoctorAction} from '../../redux/actions/doctorActions';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, IDoctor} from '../../types';
import FoundDoctor from './FoundDoctor';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type FindDoctorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FindDoctor'
>;

type Props = {
  navigation: FindDoctorScreenNavigationProp;
};
const FindDoctor: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);

  const [searchValue, setSearchValue] = React.useState<string>(
    __DEV__ ? '0781630358' : '',
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [foundDoctor, setFoundDoctor] = React.useState<IDoctor | undefined>(
    undefined,
  );

  function handleSearchValue(text: string) {
    setSearchValue(text);
    setFoundDoctor(undefined);
  }

  async function findDoctor() {
    try {
      setLoading(true);
      const doctor = await fetchDoctorByPhone(searchValue);
      setFoundDoctor(doctor);
      dispatch(setDoctorAction(doctor));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Oops!',
        'Vérifier le numéro de téléphone et que vous êtes bien connecté à internet',
      );
      console.log(error);
    }
  }

  return (
    <ScreenContainer safeArea={{style: {marginBottom: -100}}}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Touchable
            shadow
            onPress={() => {
              navigation.navigate('PatientProfile');
            }}>
            <Avatar radius={70} />
          </Touchable>
          <Text style={styles.profileName}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Input
            style={{textAlign: 'center'}}
            placeholder="Numéro du docteur"
            keyboardType="phone-pad"
            onChangeText={handleSearchValue}
            value={searchValue}
            onSubmitEditing={findDoctor}
            keyboardAppearance="dark"
            returnKeyType="search"
          />
        </View>

        {loading ? (
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Loader />
          </View>
        ) : foundDoctor ? (
          <FoundDoctor
            {...foundDoctor}
            onPress={() => {
              navigation.navigate('DoctorSessions');
            }}
          />
        ) : (
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Image
                style={styles.doctorIllustration}
                source={doctorIllustration}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  color: Colors.darkGray,
                }}>
                Trouvez votre médecin
              </Text>
            </TouchableWithoutFeedback>
          </>
        )}
        <View style={styles.pushToBottomCenter}>
          <FloatingButton
            disabled={loading || !searchValue}
            onPress={findDoctor}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default FindDoctor;
