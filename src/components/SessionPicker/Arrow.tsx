import React from 'react';
import {View} from 'react-native';
import {Touchable} from '..';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../utils/values';
import {arrowStyles} from './styles';
const Arrow: React.FC<{left?: boolean; onPress: () => void}> = ({
  left,
  onPress,
}) => {
  return (
    <View style={arrowStyles.container}>
      <Touchable
        borderRadius={100}
        onPress={onPress}
        containerStyle={arrowStyles.touchContainer}
        style={arrowStyles.touch}>
        <Icon
          style={{
            fontSize: 14,
            color: Colors.darkGray,
          }}
          name={left ? 'arrow-left' : 'arrow-right'}
        />
      </Touchable>
    </View>
  );
};

export default Arrow;
