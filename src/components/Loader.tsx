import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Colors} from '../utils/values';

const Loader: React.FC<{color?: string; duration?: number}> = ({
  color = Colors.primary,
  duration,
}) => {
  const [animating, setAnimating] = React.useState(true);

  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration]);

  if (!animating) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color={color}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
