import React from 'react';
import {View, Text} from 'react-native';
import {foundStyles} from './styles';
import {Colors} from '../../utils/values';
import {IDoctor} from '../../types';
import {Touchable, Avatar} from '../../components';

const FoundDoctor: React.FC<IDoctor & {onPress: () => void}> = ({
  firstName,
  lastName,
  address,
  onPress,
}) => {
  return (
    <View
      style={{
        elevation: 50,
        backgroundColor: Colors.white,
        margin: 20,
        borderRadius: 20,
      }}>
      <Touchable
        borderRadius={20}
        onPress={onPress}
        style={foundStyles.container}>
        <Avatar />
        <View style={foundStyles.descContainer}>
          <Text
            style={[
              foundStyles.descText,
              {fontWeight: 'bold', color: Colors.primary},
            ]}>{`Dr ${firstName} ${lastName}`}</Text>
          <Text style={[foundStyles.descText, {fontSize: 16}]}>{address}</Text>
        </View>
      </Touchable>
    </View>
  );
};
export default FoundDoctor;
