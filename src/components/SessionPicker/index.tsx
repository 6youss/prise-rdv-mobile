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
  filterMode?: 'taken' | 'available' | 'both';
  currentDate?: Date;
  dayCount?: 1 | 2 | 3 | 4 | 5;
  defaultStartingHour?: ZTime;
  defaultEndingHour?: ZTime;
  defaultSessionDuration?: number;
  workingHours?: IDoctor['workingHours'];
  sessionDurations?: IDoctor['sessionDurations'];
  unavailablitites?: IDoctor['unavailablities'];
  allreadyTakenHours?: Sessions;
  onDayPress?: onDayPressFunction;
  onRefresh?: () => void;
  onArrowRightPress?: (currentDate: Date) => void;
  onArrowLeftPress?: (currentDate: Date) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  filterMode = 'available',
  currentDate = new Date(),
  dayCount = 3,
  defaultStartingHour = ZTime.fromString('08:00'),
  defaultEndingHour = ZTime.fromString('17:00'),
  defaultSessionDuration = 30,
  workingHours = [],
  unavailablitites = [],
  sessionDurations = [],
  allreadyTakenHours = {},
  onDayPress = () => {},
  onRefresh = () => {},
  onArrowRightPress = () => {},
  onArrowLeftPress = () => {},
}) => {
  let __allredyTakenHours: ZSessions = {}; //sessions formated and filtered from the sessions prop
  let filteredHours: ZSessions = {};

  const shownDatesRange = dateRange(currentDate, dayCount - 1);

  for (let date of shownDatesRange) {
    const dateStr = getStringFromDate(date, false);
    __allredyTakenHours[dateStr] = [];
    if (allreadyTakenHours[dateStr]) {
      __allredyTakenHours[dateStr] = allreadyTakenHours[dateStr].map(hour => {
        if (typeof hour === 'string') {
          return ZTime.fromString(hour);
        } else {
          return ZTime.fromString(hour.time, hour.id);
        }
      });
    }
    filteredHours[dateStr] = getShownHours(dateStr);
  }

  const dayColumnWidth = 80 / dayCount;

  function getWorkHours(date: Date): {startingHour: ZTime; endingHour: ZTime} {
    let startToEnd = {
      startingHour: defaultStartingHour,
      endingHour: defaultEndingHour,
    };
    for (let wh of workingHours) {
      if (isDateInRange(date, wh.from, wh.to)) {
        startToEnd.startingHour = ZTime.fromMinutes(wh.opensAt);
        startToEnd.endingHour = ZTime.fromMinutes(wh.closesAt);
      }
    }
    return startToEnd;
  }

  function getSessionDuration(date: Date): number {
    for (let sd of sessionDurations) {
      if (isDateInRange(date, sd.from, sd.to)) {
        return sd.duration;
      }
    }
    return defaultSessionDuration;
  }

  function getShownHours(sessionDateKey: string): Array<ZTime> {
    let allreadyTakenHours = __allredyTakenHours[sessionDateKey];
    const sessionDate = getDateFromString(sessionDateKey);
    let {startingHour, endingHour} = getWorkHours(sessionDate);
    let sessionDuration = getSessionDuration(sessionDate);
    let shownHours: Array<ZTime> = [];
    let _hour = startingHour;

    while (
      _hour.isLess(endingHour) &&
      endingHour.toMinutes() - _hour.toMinutes() >= sessionDuration
    ) {
      let isUnavailableHour = false;
      for (let unavailablity of unavailablitites) {
        const sessionDateWithTime = new Date(
          sessionDate.setHours(_hour.hours, _hour.minutes, 0, 0),
        );
        if (
          isDateInRange(
            sessionDateWithTime,
            unavailablity.from,
            unavailablity.to,
            false,
          )
        ) {
          isUnavailableHour = true;
          break;
        }
      }
      if (isUnavailableHour) _hour.unavailable = true;
      const takenHour = allreadyTakenHours.find(hour => hour.equals(_hour));
      if (takenHour)
        _hour = ZTime.fromString(takenHour.toString(), takenHour.id);

      shownHours.push(_hour);
      _hour = _hour.addDuration(sessionDuration);
    }
    return shownHours;
  }

  const DaysHeader: React.FC = () => {
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
        {Object.keys(filteredHours).map(availableHoursDate => {
          const date = getDateFromString(availableHoursDate);
          const emptyDay =
            filteredHours[availableHoursDate].find(
              hour => !hour.id && !hour.unavailable,
            ) === undefined && filterMode !== 'both';
          return (
            <View
              key={availableHoursDate}
              style={{
                width: `${dayColumnWidth}%`,
                opacity: emptyDay ? 0.5 : 1,
              }}>
              <Text style={dayColStyles.day}>{getDayName(date)}</Text>
              <Text
                style={[
                  dayColStyles.month,
                  emptyDay && {color: Colors.darkGray},
                ]}>{`${date.getDate()} ${getMonthName(date)}`}</Text>
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
      <DaysHeader />
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.hoursContainer}>
        {Object.keys(filteredHours).map(date => {
          return (
            <DayColumn
              filerMode={filterMode}
              width={dayColumnWidth}
              key={'day-' + date}
              day={date}
              hours={filteredHours[date]}
              onDayPress={onDayPress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SessionPicker;
