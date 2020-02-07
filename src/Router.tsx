import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {useSelector, useDispatch} from 'react-redux';

import {Splash, FindDoctor} from './screens';
import {RootState} from './redux/reducers';

import {getUser} from './api/user';
import {IUser} from './types';
import {setPatientProfileAction} from './redux/actions/patientActions';
import Login from './screens/Login';

const Stack = createStackNavigator();

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
};

export default function Router() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(true);

  const {accessToken} = useSelector(function(store: RootState): IUser {
    return store.user;
  });

  React.useEffect(() => {
    async function auth() {
      try {
        setIsLoading(true);
        if (!accessToken) {
          throw new Error('access token not found');
        }
        const userProfile = await getUser(accessToken);
        dispatch(setPatientProfileAction(userProfile.patient));
        setNeedAuth(false);
        setIsLoading(false);
      } catch (error) {
        console.log({error: error.message});
        setIsLoading(false);
        setNeedAuth(true);
      }
    }
    auth();
  }, [accessToken, dispatch]);

  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : needAuth ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="FindDoctor" component={FindDoctor} />
      )}
    </Stack.Navigator>
  );
}
