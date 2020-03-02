import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import {Colors, smallShadow} from '../utils/values';

const Touchable: React.FC<TouchableNativeFeedbackProps & {
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  rippleColor?: string;
  shadow?: boolean;
  androidShadow?: number;
}> = ({
  children,
  style,
  containerStyle,
  borderRadius = 5,
  rippleColor = Colors.primaryLight,
  shadow = false,
  androidShadow,
  ...props
}) => {
  return (
    <View style={[shadow && smallShadow, containerStyle]}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius,
          elevation: androidShadow,
        }}>
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback
            {...props}
            background={TouchableNativeFeedback.Ripple(rippleColor)}>
            <View style={style}>{children}</View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity {...props} style={style}>
            <View>{children}</View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Touchable;
