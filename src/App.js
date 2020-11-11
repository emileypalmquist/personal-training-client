import 'react-native-gesture-handler';
import React, {useEffect, useState, useMemo, useReducer} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SignedIn, SignedOut} from './services/router';
import api from './services/api';
import {AuthContext} from './context/AuthContext';

const App = () => {
  const initialState = {
    isLoading: true,
    signedIn: false,
    user: {},
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'SIGNIN':
        return {
          ...prevState,
          signedIn: true,
          isLoading: false,
          user: action.user,
        };
      case 'SIGNUP':
        return {
          ...prevState,
          signedIn: true,
          isLoading: false,
          user: action.user,
        };
      case 'SIGNOUT':
        return {
          ...prevState,
          signedIn: false,
          isLoading: false,
          user: {},
        };
      case 'REAUTH':
        return {
          ...prevState,
          signedIn: true,
          isLoading: false,
          user: action.user,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(() => ({
    signIn: (user) => {
      dispatch({type: 'SIGNIN', user: user});
    },
    signUp: (user) => {
      dispatch({type: 'SIGNUP', user: user});
    },
    signOut: () => {
      dispatch({type: 'SIGNOUT'});
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await api.auth.getToken();
      } catch (e) {
        console.log(e);
      }
      if (token) {
        api.auth
          .reAuth()
          .then((data) => {
            if (data.user) {
              dispatch({type: 'REAUTH', user: data.user});
            } else {
              alert(data.message);
            }
          })
          .catch((error) => console.log(error));
      } else {
        api.auth.signOut();
        dispatch({type: 'SIGNOUT'});
      }
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.signedIn ? SignedIn() : SignedOut()}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
