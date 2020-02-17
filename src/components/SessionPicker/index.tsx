import React from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import {ZHour} from '../../utils/zdate';
import styles, {dcs} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import Touchable from '../Touchable';
import DayColumn from './DayColumn';
import {Colors} from '../../utils/values';
import {getDayName, getMonthName, getDateFromString} from '../../utils/date';

export type Hours = Array<string>;

export type ZHours = Array<ZHour>;

export interface Sessions {
  [date: string]: Hours;
}

export interface ZSessions {
  [date: string]: ZHours;
}

export interface SessionPickerProps {
  dayCount: number;
  startingHour?: ZHour;
  endingHour?: ZHour;
  sessionDuration?: number;
  sessions: Sessions;
  onDayPress?: (day: string, hour: ZHour) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  dayCount,
  startingHour = ZHour.fromString('08:00'),
  endingHour = ZHour.fromString('17:00'),
  sessionDuration = 30,
  sessions,
  onDayPress,
}) => {
  if (Object.keys(sessions).length < dayCount) {
    console.warn(
      'max dayCount is 5 and it must be less than the sessions number',
    );
    dayCount = Object.keys(sessions).length % 5;
  }

  let __sessions: ZSessions = {};
  for (let i = 0; i < Object.keys(sessions).length; i++) {
    if (i >= dayCount) break;
    const date = Object.keys(sessions)[i];
    __sessions[date] = sessions[date].map(hour => ZHour.fromString(hour));
  }

  const dayColumnWidth = 80 / dayCount;

  const Arrow: React.FC<{left?: boolean}> = ({left}) => {
    return (
      <Touchable
        containerStyle={{width: '10%'}}
        style={{alignItems: 'center', padding: 10}}>
        <Icon
          style={{fontSize: 20, color: Colors.darkGray}}
          name={left ? 'arrow-left' : 'arrow-right'}
        />
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
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
              <Text style={dcs.day}>{getDayName(date)}</Text>
              <Text style={dcs.month}>{`${date.getDate()} ${getMonthName(
                date,
              )}`}</Text>
            </View>
          );
        })}
        <Arrow />
      </View>

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
          const availableHours = ZHour.filterAvailableHours(
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
