import React from 'react';
import {ScrollView, Text} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {IPatient, RootState} from '../../types';
import ScreenContainer from '../../components/ScreenContainer';

const FindDoctor = () => {
  const patient = useSelector(function(store: RootState): IPatient {
    return store.patient;
  });
  return (
    <>
      <ScreenContainer>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>
            Hello Mr {patient.firstName} {patient.lastName}
          </Text>
        </ScrollView>
      </ScreenContainer>
    </>
  );
};

export default FindDoctor;
