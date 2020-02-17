import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {getDayName, getMonthName, getDateFromString} from '../../utils/date';
import {ZHours} from '.';
import {dcs} from './styles';
import Touchable from '../Touchable';
import {ZHour} from '../../utils/zdate';

const DayColumn: React.FC<{
  day: string;
  availableHours: ZHours;
  width: number;
  onDayPress?: (day: string, hour: ZHour) => void;
}> = ({day, availableHours, width, onDayPress}) => {
  return (
    <View style={[dcs.container, {width: `${width}%`}]}>
      {availableHours.map((hour, index) => (
        <Touchable
          onPress={React.useCallback(() => {
            if (typeof onDayPress === 'function') onDayPress(day, hour);
          }, [onDayPress])}
          key={'hour-' + index}
          containerStyle={{width: '90%', height: 70, marginVertical: 5}}
          style={dcs.hour}
          borderRadius={5}>
          <Text style={dcs.hourText}>{hour.toString()}</Text>
        </Touchable>
      ))}
    </View>
  );
};

export default DayColumn;
