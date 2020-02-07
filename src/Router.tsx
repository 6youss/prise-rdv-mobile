import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {useSelector} from 'react-redux';

import {Splash, FindDoctor} from './screens';
import {RootState} from './redux/reducers';
import {IUserState} from './redux/reducers/userReducer';

const Stack = createStackNavigator();

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
};

export default function Router() {
  const {accessToken} = useSelector(function(store: RootState): IUserState {
    return store.user;
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //check the token by getting the user info
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  console.log(accessToken);
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {loading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : (
        <Stack.Screen name="FindDoctor" component={FindDoctor} />
      )}
    </Stack.Navigator>
  );
}
