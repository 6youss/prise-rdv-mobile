import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Touchable} from '.';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utils/values';

const GoBack: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <Touchable onPress={onPress} borderRadius={20} style={styles.goBack}>
        <Icon style={styles.goBackTxt} name="arrow-left" />
      </Touchable>
    </View>
  );
};
export default GoBack;

const styles = StyleSheet.create({
  goBack: {
    width: 30,
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  goBackTxt: {
    fontSize: 17,
    color: Colors.primary,
    textAlign: 'center',
  },
});
