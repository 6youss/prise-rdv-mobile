import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
  Text,
  View,
} from 'react-native';
import {Colors} from '../utils/values';
import Touchable from './Touchable';

const Button: React.FC<{
  onPress: () => void;
  light?: boolean;
  text: string;
}> = ({onPress, light, text}) => {
  return (
    <Touchable
      onPress={onPress}
      borderRadius={20}
      style={[styles.button, light && {backgroundColor: Colors.white}]}>
      <Text style={[styles.buttonText, light && {color: Colors.primary}]}>
        {text}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },
});
export default Button;
