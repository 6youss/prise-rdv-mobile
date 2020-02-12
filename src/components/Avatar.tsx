import React from 'react';
import {StyleSheet, Image} from 'react-native';
import defaultProfile from '../assets/defaultProfile.jpg';

const Avatar: React.FC<{source?: string; radius?: number}> = ({
  source = defaultProfile,
  radius = 55,
}) => {
  return (
    <Image
      source={source}
      style={[
        styles.avatar,
        {width: radius, height: radius, borderRadius: radius},
      ]}
    />
  );
};
export default Avatar;

const styles = StyleSheet.create({
  avatar: {},
});
