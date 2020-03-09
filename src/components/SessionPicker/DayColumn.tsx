import React from 'react';
import {View, Text} from 'react-native';
import {ZHours, onDayPressFunction, SessionPickerProps} from '.';
import {dayColStyles} from './styles';
import Touchable from '../Touchable';
import {Colors} from '../../utils/values';

const DayColumn: React.FC<{
  filerMode: SessionPickerProps['filterMode'];
  day: string;
  hours: ZHours;
  width: number;
  onDayPress?: onDayPressFunction;
}> = ({filerMode, day, hours, width, onDayPress = () => {}}) => {
  return (
    <View style={[dayColStyles.container, {width: `${width}%`}]}>
      {hours.map((hour, index) => {
        switch (filerMode) {
          case 'available':
            if (!hour.unavailable)
              return (
                <Touchable
                  androidShadow={2}
                  shadow
                  onPress={() => {
                    onDayPress(day, hour);
                  }}
                  key={'hour-' + index}
                  containerStyle={{width: '90%', height: 70, marginVertical: 5}}
                  style={dayColStyles.hour}
                  borderRadius={8}>
                  <Text style={dayColStyles.hourText}>{hour.toString()}</Text>
                </Touchable>
              );
            break;
          case 'taken':
            if (hour.id) {
              return (
                <Touchable
                  androidShadow={2}
                  shadow
                  onPress={() => {
                    onDayPress(day, hour);
                  }}
                  key={'hour-' + index}
                  containerStyle={{width: '90%', height: 70, marginVertical: 5}}
                  style={dayColStyles.hour}
                  borderRadius={8}>
                  <Text style={dayColStyles.hourText}>{hour.toString()}</Text>
                </Touchable>
              );
            }
            break;
          case 'both':
            return (
              <Touchable
                androidShadow={2}
                shadow
                onPress={() => {
                  onDayPress(day, hour);
                }}
                key={'hour-' + index}
                containerStyle={{width: '90%', height: 70, marginVertical: 5}}
                style={dayColStyles.hour}
                borderRadius={8}>
                <Text style={dayColStyles.hourText}>{hour.toString()}</Text>
                {hour.id && <View style={dayColStyles.dot} />}
              </Touchable>
            );
          default:
            return null;
            break;
        }
      })}
    </View>
  );
};

export default DayColumn;
