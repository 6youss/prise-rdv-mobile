import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ZTime} from '../../utils/ztime';
import styles, {dcstyle} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import Touchable from '../Touchable';
import DayColumn from './DayColumn';
import {Colors} from '../../utils/values';
import {
  getDayName,
  getMonthName,
  getDateFromString,
  getStringFromDate,
  dateRange,
} from '../../utils/date';

export type Hours = Array<{id: string; time: string} | string>;

export interface Sessions {
  [date: string]: Hours;
}

export type ZHours = Array<ZTime>;

export interface ZSessions {
  [date: string]: ZHours;
}

export type onDayPressFunction = (day: string, hour: ZTime) => void;

export interface SessionPickerProps {
  reverseFilter?: boolean;
  currentDate?: Date;
  dayCount?: 1 | 2 | 3 | 4 | 5;
  startingHour?: ZTime;
  endingHour?: ZTime;
  sessionDuration?: number;
  sessions?: Sessions;
  onDayPress?: onDayPressFunction;
  onArrowRightPress?: (currentDate: Date) => void;
  onArrowLeftPress?: (currentDate: Date) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  reverseFilter = false,
  currentDate = new Date(),
  dayCount = 3,
  startingHour = ZTime.fromString('08:00'),
  endingHour = ZTime.fromString('17:00'),
  sessionDuration = 30,
  sessions = {},
  onDayPress = () => {},
  onArrowRightPress = () => {},
  onArrowLeftPress = () => {},
}) => {
  let __sessions: ZSessions = {}; //sessions formated and filtered from the sessions prop

  const activeDates = dateRange(currentDate, dayCount - 1);
  for (let date of activeDates) {
    const dateStr = getStringFromDate(date, false);
    __sessions[dateStr] = [];
    if (sessions[dateStr])
      __sessions[dateStr] = sessions[dateStr].map(hour => {
        if (typeof hour === 'string') {
          return ZTime.fromString(hour);
        } else {
          return ZTime.fromString(hour.time, hour.id);
        }
      });
  }

  const dayColumnWidth = 80 / dayCount;

  const Arrow: React.FC<{left?: boolean}> = ({left}) => {
    return (
      <Touchable
        borderRadius={40}
        onPress={() => {
          left ? onArrowLeftPress(currentDate) : onArrowRightPress(currentDate);
        }}
        containerStyle={{width: '10%'}}
        style={{alignItems: 'center', padding: 10}}>
        <Icon
          style={{fontSize: 20, color: Colors.darkGray}}
          name={left ? 'arrow-left' : 'arrow-right'}
        />
      </Touchable>
    );
  };

  const PickerHeader: React.FC = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <Arrow left />
        {Object.keys(__sessions).map(sessionDate => {
          const date = getDateFromString(sessionDate);
          return (
            <View
              key={sessionDate}
              style={{
                width: `${dayColumnWidth}%`,
              }}>
              <Text style={dcstyle.day}>{getDayName(date)}</Text>
              <Text style={dcstyle.month}>{`${date.getDate()} ${getMonthName(
                date,
              )}`}</Text>
            </View>
          );
        })}
        <Arrow />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PickerHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: Colors.lightGray,
          flexGrow: 1,
        }}>
        {Object.keys(__sessions).map(sessionDate => {
          const availableHours = reverseFilter
            ? __sessions[sessionDate]
            : ZTime.filterAvailableHours(
                startingHour,
                endingHour,
                sessionDuration,
                __sessions[sessionDate],
              );
          return (
            <DayColumn
              width={dayColumnWidth}
              key={'day-' + sessionDate}
              day={sessionDate}
              availableHours={availableHours}
              onDayPress={onDayPress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SessionPicker;
