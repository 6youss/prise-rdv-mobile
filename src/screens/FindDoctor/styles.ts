import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: Colors.white},
  searchContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    color: Colors.whiteTransparent,
    marginTop: 7,
    marginBottom: 40,
  },
  pushToBottomCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  doctorIllustration: {
    width: '100%',
    height: 300,
  },
});
export default styles;
