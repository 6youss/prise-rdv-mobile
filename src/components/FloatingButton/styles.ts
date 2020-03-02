import {StyleSheet} from 'react-native';
import {Colors, bigShadow} from '../../utils/values';

const styles = StyleSheet.create({
  searchButtonContainer: {
    borderRadius: 80,
    margin: 30,
    ...bigShadow,
  },
  searchButton: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
});
export default styles;
