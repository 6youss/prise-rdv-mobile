import React from 'react';
import {Text, View, Image, TouchableNativeFeedback, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {IPatient, RootState} from '../../types';
import {ScreenContainer, Input} from '../../components';
import defaultProfile from '../../assets/defaultProfile.jpg';
import styles from './styles';
import {Colors} from '../../utils/values';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchDoctorByPhone} from '../../api/doctor';

const FindDoctor = () => {
  const patient = useSelector(function(store: RootState): IPatient {
    return store.patient;
  });

  const [searchValue, setSearchValue] = React.useState('');

  function handleSearchValue(text: string) {
    setSearchValue(text);
  }

  async function findDoctor() {
    try {
      const doctor = await fetchDoctorByPhone(searchValue);
    } catch (error) {}
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Image style={styles.profilePic} source={defaultProfile} />
          <Text style={styles.profileName}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Input
            placeholder="Numéro du docteur"
            keyboardType="phone-pad"
            onChangeText={handleSearchValue}
            value={searchValue}
            onSubmitEditing={findDoctor}
          />
        </View>
        <View style={styles.pushToBottomCenter}>
          <View style={styles.searchButtonContainer}>
            <TouchableNativeFeedback onPress={findDoctor}>
              <View style={styles.searchButton}>
                <Icon
                  name="search"
                  size={27}
                  style={{textAlign: 'center'}}
                  color={Colors.primaryDark}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default FindDoctor;
