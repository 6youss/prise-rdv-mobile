import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {ZTime} from '../../utils/ztime';
import styles, {dayColStyles} from './styles';

import DayColumn from './DayColumn';
import {Colors} from '../../utils/values';
import {
  getDayName,
  getMonthName,
  getDateFromString,
  getStringFromDate,
  dateRange,
} from '../../utils/date';
import Arrow from './Arrow';

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
  onRefresh?: () => void;
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
  onRefresh = () => {},
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

  const PickerHeader: React.FC = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <Arrow
          onPress={() => {
            onArrowLeftPress(currentDate);
          }}
          left
        />
        {Object.keys(__sessions).map(sessionDate => {
          const date = getDateFromString(sessionDate);
          return (
            <View
              key={sessionDate}
              style={{
                width: `${dayColumnWidth}%`,
              }}>
              <Text style={dayColStyles.day}>{getDayName(date)}</Text>
              <Text
                style={dayColStyles.month}>{`${date.getDate()} ${getMonthName(
                date,
              )}`}</Text>
            </View>
          );
        })}
        <Arrow
          onPress={() => {
            onArrowRightPress(currentDate);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PickerHeader />
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.hoursContainer}>
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
