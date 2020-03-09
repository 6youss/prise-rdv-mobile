import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
  ViewProps,
} from 'react-native';
import {Colors, smallShadow} from '../utils/values';

const Touchable: React.FC<TouchableNativeFeedbackProps & {
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadiusViewStyle?: StyleProp<ViewStyle>;
  rippleColor?: string;
  shadow?: boolean;
  androidShadow?: number;
}> = ({
  children,
  style,
  containerStyle,
  borderRadiusViewStyle,
  borderRadius = 5,
  rippleColor = Colors.primaryLight,
  shadow = false,
  androidShadow,
  ...props
}) => {
  return (
    <View style={[shadow && smallShadow, containerStyle]}>
      <View
        style={[
          {
            overflow: 'hidden',
            borderRadius,
            elevation: androidShadow,
          },
          borderRadiusViewStyle,
        ]}>
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback
            {...props}
            style={{flex: 1}}
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
