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
import Loader from './Loader';

const Button: React.FC<{
  onPress: () => void;
  light?: boolean;
  text: string;
  loading?: boolean;
}> = ({onPress, light, text, loading = false}) => {
  return (
    <Touchable
      containerStyle={{elevation: 20}}
      onPress={!loading ? onPress : () => {}}
      borderRadius={20}
      style={[styles.button, light && {backgroundColor: Colors.white}]}>
      {loading ? (
        <Loader />
      ) : (
        <Text style={[styles.buttonText, light && {color: Colors.primary}]}>
          {text}
        </Text>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
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
