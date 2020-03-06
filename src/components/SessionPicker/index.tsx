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
  isDateInRange,
} from '../../utils/zdate';
import Arrow from './Arrow';
import {IDoctor} from '../../types';

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
  defaultStartingHour?: ZTime;
  defaultEndingHour?: ZTime;
  defaultSessionDuration?: number;
  workingHours?: IDoctor['workingHours'];
  sessionDurations?: IDoctor['sessionDurations'];
  unavailablitites?: IDoctor['unavailablities'];
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
  defaultStartingHour = ZTime.fromString('08:00'),
  defaultEndingHour = ZTime.fromString('17:00'),
  defaultSessionDuration = 30,
  workingHours = [],
  unavailablitites = [],
  sessionDurations = [],
  sessions = {},
  onDayPress = () => {},
  onRefresh = () => {},
  onArrowRightPress = () => {},
  onArrowLeftPress = () => {},
}) => {
  let __sessions: ZSessions = {}; //sessions formated and filtered from the sessions prop

  const shownDates = dateRange(currentDate, dayCount - 1);
  for (let date of shownDates) {
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
          let startingHour = defaultStartingHour,
            endingHour = defaultEndingHour,
            duration = defaultSessionDuration;

          for (let workHours of workingHours) {
            if (
              isDateInRange(
                getDateFromString(sessionDate),
                workHours.from,
                workHours.to,
                true,
              )
            ) {
              startingHour = ZTime.fromMinutes(workHours.opensAt);
              endingHour = ZTime.fromMinutes(workHours.closesAt);
            }
          }

          for (let sd of sessionDurations) {
            if (isDateInRange(getDateFromString(sessionDate), sd.from, sd.to)) {
              duration = sd.duration;
            }
          }

          const availableHours = reverseFilter
            ? __sessions[sessionDate]
            : ZTime.filterAvailableHours(
                startingHour,
                endingHour,
                duration,
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
