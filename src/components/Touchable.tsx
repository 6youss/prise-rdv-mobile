import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors} from '../utils/values';

const Touchable: React.FC<TouchableNativeFeedbackProps & {
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  rippleColor?: string;
}> = ({
  children,
  style,
  containerStyle,
  borderRadius = 5,
  rippleColor = Colors.primaryLight,
  ...props
}) => {
  return (
    <View style={[{overflow: 'hidden', borderRadius}, containerStyle]}>
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple(rippleColor)}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};
export default Touchable;
