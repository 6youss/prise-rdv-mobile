import React from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './styles';
import {IDoctor} from '../../types';
import Avatar from '../Avatar';
import {Colors} from '../../utils/values';
import Touchable from '../Touchable';

const DoctorItem: React.FC<IDoctor & {onPress: () => void}> = ({
  firstName,
  lastName,
  address,
  onPress,
}) => {
  return (
    <Touchable onPress={onPress} style={styles.container}>
      <Avatar />
      <View style={styles.descContainer}>
        <Text
          style={[
            styles.descText,
            {fontWeight: 'bold', color: Colors.secondary},
          ]}>{`Dr ${firstName} ${lastName}`}</Text>
        <Text style={[styles.descText, {fontSize: 16}]}>{address}</Text>
      </View>
    </Touchable>
  );
};
export default DoctorItem;
