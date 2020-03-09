import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {useSelector, useDispatch} from 'react-redux';

import {
  Splash,
  FindDoctor,
  ReservationCalendar,
  Login,
  DoctorCalendar,
  DoctorProfile,
  SessionDetail,
  PatientProfile,
  DoctorAvailablities,
} from './screens';

import {getUser} from './api/user';
import {setPatientAction} from './redux/actions/patientActions';

import {tokenSelector, userTypeSelector} from './redux/selectors';
import {setDoctorAction} from './redux/actions/doctorActions';
import NotificationHandler from './components/NotificationHandler';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  FindDoctor: undefined;
  PatientProfile: undefined;
  ReservationCalendar: undefined;
  DoctorCalendar: undefined;
  DoctorProfile: undefined;
  DoctorAvailablities: undefined;
  SessionDetail: {id: string};
};
const Stack = createStackNavigator<RootStackParamList>();

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
};

export default function Router() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(true);

  const accessToken = useSelector(tokenSelector);
  const userType = useSelector(userTypeSelector);

  React.useEffect(() => {
    async function auth() {
      try {
        setIsLoading(true);
        if (!accessToken) {
          throw new Error('access token not found');
        }
        const userProfile = await getUser(accessToken);

        if (userType === 'doctor') {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }

        setNeedAuth(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log({error: error.message});
        setIsLoading(false);
        setNeedAuth(true);
      }
    }
    auth();
  }, [accessToken, dispatch]);

  return (
    <>
      <Stack.Navigator screenOptions={defaultOptions}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : needAuth ? (
          <Stack.Screen name="Login" component={Login} />
        ) : userType === 'patient' ? (
          <>
            <Stack.Screen name="FindDoctor" component={FindDoctor} />
            <Stack.Screen
              name="ReservationCalendar"
              component={ReservationCalendar}
            />
            <Stack.Screen name="PatientProfile" component={PatientProfile} />
          </>
        ) : (
          <>
            <Stack.Screen name="DoctorCalendar" component={DoctorCalendar} />
            <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
            <Stack.Screen
              name="DoctorAvailablities"
              component={DoctorAvailablities}
            />
            <Stack.Screen name="SessionDetail" component={SessionDetail} />
          </>
        )}
      </Stack.Navigator>
      {!needAuth && <NotificationHandler />}
    </>
  );
}
