import React from 'react';
import {StyleSheet} from 'react-native';
import {Touchable} from '..';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../utils/values';
const arrowStyles = StyleSheet.create({
  touchContainer: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Arrow: React.FC<{left?: boolean; onPress: () => void}> = ({
  left,
  onPress,
}) => {
  return (
    <Touchable
      borderRadius={0}
      onPress={onPress}
      containerStyle={arrowStyles.touchContainer}
      borderRadiusViewStyle={{width: '100%', flex: 1}}
      style={arrowStyles.touch}>
      <Icon
        style={{
          fontSize: 14,
          color: Colors.darkGray,
        }}
        name={left ? 'arrow-left' : 'arrow-right'}
      />
    </Touchable>
  );
};

export default Arrow;
