import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, smallShadow} from '../utils/values';
import Touchable from './Touchable';
import Loader from './Loader';

const Button: React.FC<{
  onPress: () => void;
  light?: boolean;
  text: string;
  loading?: boolean;
  style?: ViewStyle;
}> = ({onPress, light, text, loading = false, style}) => {
  return (
    <View style={{...smallShadow}}>
      <Touchable
        shadow
        onPress={!loading ? onPress : () => {}}
        borderRadius={20}
        style={[
          styles.button,
          light && {backgroundColor: Colors.white},
          style,
        ]}>
        {loading ? (
          <Loader />
        ) : (
          <Text style={[styles.buttonText, light && {color: Colors.primary}]}>
            {text}
          </Text>
        )}
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 8,
    minHeight: 40,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },
});
export default Button;
