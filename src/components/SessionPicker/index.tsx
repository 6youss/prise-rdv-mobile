import React from 'react';
import {View, Text} from 'react-native';
import {ZHour} from '../../utils/ZDate';
import styles from './styles';
import ScreenContainer from '../ScreenContainer';
type Hours = Array<string>;

type ZHours = Array<ZHour>;

interface Sessions {
  [date: string]: Hours;
}

interface ZSessions {
  [date: string]: ZHours;
}

interface SessionPickerProps {
  startingHour?: ZHour;
  endingHour?: ZHour;
  sessionDuration?: number;
  sessions: Sessions;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  startingHour = ZHour.fromString('08:00'),
  endingHour = ZHour.fromString('17:00'),
  sessionDuration = 30,
  sessions,
}) => {
  let __sessions: ZSessions = {};
  Object.keys(sessions).forEach(date => {
    __sessions[date] = sessions[date].map(hour => ZHour.fromString(hour));
  });
  return (
    <ScreenContainer>
      <View style={styles.container}>
        {Object.keys(__sessions).map(sessionDate => {
          const reservedHours = __sessions[sessionDate];
          return dayColumn(sessionDate, reservedHours);
        })}
      </View>
    </ScreenContainer>
  );

  function dayColumn(day: string, reservedHours: ZHours) {
    return (
      <View>
        <Text>{day}</Text>
        {filterAvailableHours(reservedHours).map((hour, index) => {
          <Text key={'hour-' + index}>{hour.toString()}</Text>;
        })}
      </View>
    );
  }

  function filterAvailableHours(reservedHours: ZHours): ZHours {
    let availableHours: ZHours = [];
    let sessionHour = startingHour;

    while (sessionHour.isLess(endingHour)) {
      if (!reservedHours.find(hour => hour.equals(sessionHour))) {
        availableHours.push(sessionHour);
      }
      sessionHour = sessionHour.addDuration(sessionDuration);
    }
    return availableHours;
  }
};
export default SessionPicker;
