import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.lightGray,
    flexGrow: 1,
  },
});

export const dcstyle = StyleSheet.create({
  container: {
    width: '20%',
    alignItems: 'center',
  },
  day: {
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  month: {
    color: Colors.secondary,
    textAlign: 'center',
    fontSize: 17,
  },
  hour: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  hourText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default styles;
