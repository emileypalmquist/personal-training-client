import React from 'react';
import {StackNavigator, TabNavigator, SwitchNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';

export const SignedOut = StackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      title: 'Welcome',
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
    },
  },
});

export const SignedIn = TabNavigator({});
