import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors} from '../utils/values';
import Touchable from './Touchable';
import Loader from './Loader';

interface ButtonProps {
  onPress: () => void;
  light?: boolean;
  color?: ViewStyle['backgroundColor'];
  text: string;
  loading?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  light,
  text,
  loading = false,
  containerStyle,
  style,
  color,
}) => {
  return (
    <Touchable
      androidShadow={4}
      shadow
      onPress={!loading ? onPress : () => {}}
      borderRadius={20}
      containerStyle={containerStyle}
      style={[
        styles.button,
        light && {backgroundColor: Colors.white},
        style,
        color !== undefined && {backgroundColor: color},
      ]}>
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
