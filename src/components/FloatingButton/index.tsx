import React from 'react';
import {
  View,
  TouchableNativeFeedbackProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../utils/values';
import styles from './styles';
import { Touchable } from '..';

const FloatingButton: React.FC<TouchableNativeFeedbackProps> = ({ ...props }) => {
  const { disabled } = props;
  return (
    <View style={styles.searchButtonContainer}>
      <Touchable borderRadius={80} {...props}>
        <View
          style={[
            styles.searchButton,
            disabled && { backgroundColor: Colors.lightGray },
          ]}>
          <Icon
            name="search"
            size={27}
            style={{ textAlign: 'center' }}
            color={disabled ? Colors.gray : Colors.primaryDark}
          />
        </View>
      </Touchable>
    </View>
  );
};
export default FloatingButton;
