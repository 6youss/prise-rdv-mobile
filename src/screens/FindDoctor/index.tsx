import React from 'react';
import {Text, View, Image, TouchableNativeFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {IPatient, RootState} from '../../types';
import {ScreenContainer, Input} from '../../components';
import defaultProfile from '../../assets/defaultProfile.jpg';
import styles from './styles';
import {Colors} from '../../utils/values';

const FindDoctor = () => {
  const patient = useSelector(function(store: RootState): IPatient {
    return store.patient;
  });
  return (
    <>
      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Image style={styles.profilePic} source={defaultProfile} />
            <Text style={styles.profileName}>
              {patient.firstName} {patient.lastName}
            </Text>
            <Input placeholder="Numéro du docteur" keyboardType="phone-pad" />
          </View>
          <View style={styles.pushToBottomCenter}>
            <View style={styles.searchButtonContainer}>
              <TouchableNativeFeedback>
                <View style={styles.searchButton}>
                  <Text style={styles.buttonText}>Trouver</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </ScreenContainer>
    </>
  );
};

export default FindDoctor;
