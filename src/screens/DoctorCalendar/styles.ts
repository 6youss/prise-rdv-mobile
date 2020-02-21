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
    marginHorizontal: 20,
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
});
export default styles;
