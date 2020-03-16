import React from 'react';
import {View, Text} from 'react-native';
import {ZHours, onDayPressFunction, SessionPickerProps} from '.';
import {dayColStyles} from './styles';
import Touchable from '../Touchable';

interface DayColumnProps {
  filterMode: SessionPickerProps['filterMode'];
  day: string;
  hours: ZHours;
  width: number;
  onDayPress?: onDayPressFunction;
}

const DayColumn: React.FC<DayColumnProps> = ({
  filterMode,
  day,
  hours,
  width,
  onDayPress = () => {},
}) => {
  return (
    <View style={[dayColStyles.container, {width: `${width}%`}]}>
      {hours.map((hour, index) => {
        const isHourTaken = hour.id !== undefined;
        return (
          <Touchable
            androidShadow={2}
            shadow
            onPress={() => {
              onDayPress(day, hour);
            }}
            key={'hour-' + index}
            containerStyle={{width: '90%', height: 70, marginVertical: 5}}
            style={[dayColStyles.hour, isHourTaken && dayColStyles.takenHour]}
            borderRadius={8}>
            <Text
              style={[
                dayColStyles.hourText,
                isHourTaken && dayColStyles.takenHourText,
              ]}>
              {hour.toString()}
            </Text>
            {/* {hour.id && <View style={dayColStyles.dot} />} */}
          </Touchable>
        );
      })}
    </View>
  );
};

export default DayColumn;
