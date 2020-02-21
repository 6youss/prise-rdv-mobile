import React from 'react';
import {View, Text} from 'react-native';
import {ZHours, onDayPressFunction} from '.';
import {dayColStyles} from './styles';
import Touchable from '../Touchable';

const DayColumn: React.FC<{
  day: string;
  availableHours: ZHours;
  width: number;
  onDayPress?: onDayPressFunction;
}> = ({day, availableHours, width, onDayPress = () => {}}) => {
  return (
    <View style={[dayColStyles.container, {width: `${width}%`}]}>
      {availableHours.map((hour, index) => (
        <Touchable
          onPress={() => {
            onDayPress(day, hour);
          }}
          key={'hour-' + index}
          containerStyle={{width: '90%', height: 70, marginVertical: 5}}
          style={dayColStyles.hour}
          borderRadius={5}>
          <Text style={dayColStyles.hourText}>{hour.toString()}</Text>
        </Touchable>
      ))}
    </View>
  );
};

export default DayColumn;
