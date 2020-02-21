import React from 'react';
import {StyleSheet, Image, ImageStyle} from 'react-native';
import defaultProfile from '../assets/defaultProfile.jpg';

const Avatar: React.FC<{
  source?: string;
  radius?: number;
  style?: ImageStyle;
}> = ({source = defaultProfile, radius = 55, style}) => {
  return (
    <Image
      source={source}
      style={[
        styles.avatar,
        {width: radius, height: radius, borderRadius: radius},
        style,
      ]}
    />
  );
};
export default Avatar;

const styles = StyleSheet.create({
  avatar: {},
});
