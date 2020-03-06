import React from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {tokenSelector, doctorSelector} from '../redux/selectors';
import {postDevice} from '../api/user';
import {Platform, NativeModules} from 'react-native';
import {getDoctorSessions} from '../api/sessions';
import {setSearchedDoctorSessionsAction} from '../redux/actions/sessionsActions';
const NotificationHandler: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(tokenSelector);
  const doctor = useSelector(doctorSelector);

  React.useEffect(() => {
    let unsubscribe = messaging().onMessage(notificationHandler);

    async function setupNotifications() {
      try {
        const granted = await requestPermission();
        if (granted) {
          const registered = await messaging().registerForRemoteNotifications();
          // console.log({registered});
          let fcmToken;
          if (Platform.OS === 'ios') {
            fcmToken = await NativeModules.Workaround.getToken();
          } else {
            fcmToken = await messaging().getToken();
          }
          await postDevice(accessToken, fcmToken, Platform.OS);
          // console.log('posted device with', {fcmToken});
        }
      } catch (error) {
        console.log(error);
      }
    }
    setupNotifications();

    return unsubscribe;
  }, []);

  const notificationHandler = React.useCallback(
    async function(message: FirebaseMessagingTypes.RemoteMessage) {
      try {
        if (message.data) {
          switch (message.data.type) {
            case 'NEW_DOCTOR_SESSION':
              //@NOTE this can be optimed by not getting all the sessions, we get only the new one and add it to the store
              const refreshedDoctorSessions = await getDoctorSessions(
                accessToken,
                doctor._id,
              );
              dispatch(
                setSearchedDoctorSessionsAction(refreshedDoctorSessions),
              );
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [doctor],
  );

  async function requestPermission(): Promise<boolean> {
    const granted = await messaging().requestPermission();
    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
    return granted;
  }

  //@IMPORTANT calling this function is needed for ios
  async function registerAppWithFCM() {
    return;
  }

  return null;
};

export default NotificationHandler;
