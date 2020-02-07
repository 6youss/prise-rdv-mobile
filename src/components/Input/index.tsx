import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface InputProps {
  error?: string;
}

const Input: React.FC<InputProps & TextInputProps> = ({error, ...props}) => {
  return <TextInput {...props} />;
};

export default Input;
