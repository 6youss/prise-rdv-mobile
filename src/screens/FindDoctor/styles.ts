import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';
import {screenHeight} from '../../utils/dimentions';

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: Colors.white},
  searchContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
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
    resizeMode: 'contain',
    width: '100%',
    height: screenHeight(40),
  },
});

export const foundStyles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },

  descContainer: {
    padding: 20,
    alignItems: 'center',
  },
  descText: {
    fontSize: 20,
    marginBottom: 5,
  },
});
export default styles;
