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
    marginBottom: 15,
  },
  searchButtonContainer: {
    elevation: 20,
    overflow: 'hidden',
    borderRadius: 80,
    margin: 30,
  },
  searchButton: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
  pushToBottomCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default styles;
