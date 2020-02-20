import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  sessionPickerContainer: {
    margin: 20,
    marginBottom: 0,
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.lightGray,
    elevation: 50,
  },
  calendarTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: Colors.darkGray,
    marginStart: 20,
    marginTop: 20,
  },
});
export default styles;
