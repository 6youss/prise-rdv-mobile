import React from 'react';
import {View, Text} from 'react-native';
import {ZHours} from '.';
import {dcs} from './styles';
import Touchable from '../Touchable';
import {ZTime} from '../../utils/ztime';

const DayColumn: React.FC<{
  day: string;
  availableHours: ZHours;
  width: number;
  onDayPress?: (day: string, hour: ZTime, id?: string) => void;
}> = ({day, availableHours, width, onDayPress = () => {}}) => {
  return (
    <View style={[dcs.container, {width: `${width}%`}]}>
      {availableHours.map((hour, index) => (
        <Touchable
          onPress={() => {
            onDayPress(day, hour, hour.id);
          }}
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
