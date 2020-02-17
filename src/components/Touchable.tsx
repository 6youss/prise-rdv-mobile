import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

const Touchable: React.FC<TouchableNativeFeedbackProps & {
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
}> = ({children, style, containerStyle, borderRadius = 5, ...props}) => {
  return (
    <View style={[{overflow: 'hidden', borderRadius}, containerStyle]}>
      <TouchableNativeFeedback {...props}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};
export default Touchable;
