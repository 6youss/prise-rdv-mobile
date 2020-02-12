import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native';

const Touchable: React.FC<TouchableNativeFeedbackProps & {
  borderRadius?: number;
}> = ({children, style, borderRadius = 5, ...props}) => {
  return (
    <View style={{overflow: 'hidden', borderRadius}}>
      <TouchableNativeFeedback {...props}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};
export default Touchable;
