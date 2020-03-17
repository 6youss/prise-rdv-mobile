import React from 'react';
import {View, Text} from 'react-native';
import {ZHours, onHourPressFunction, SessionPickerProps} from '.';
import {dayColStyles} from './styles';
import Touchable from '../Touchable';
import {ZTime} from '../../utils/ztime';
import {getDateFromString} from '../../utils/zdate';

interface DayColumnProps {
  filterMode: SessionPickerProps['filterMode'];
  day: string;
  hours: ZHours;
  width: number;
  onHourPress?: onHourPressFunction;
}

const DayColumn: React.FC<DayColumnProps> = ({
  day,
  hours,
  width,
  onHourPress = () => {},
}) => {
  return (
    <View style={[dayColStyles.container, {width: `${width}%`}]}>
      {hours.map((hour, index) => {
        const isHourTaken = hour.id !== undefined;
        return (
          <Touchable
            androidShadow={2}
            shadow={!hour.unavailable}
            onPress={() => {
              onHourPress(
                ZTime.setDateAtTime(getDateFromString(day), hour),
                hour,
              );
            }}
            key={'hour-' + index}
            containerStyle={{width: '90%', height: 70, marginVertical: 5}}
            style={[
              dayColStyles.hour,
              isHourTaken && dayColStyles.takenHour,
              hour.unavailable && {opacity: 0.3},
            ]}
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
