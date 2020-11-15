import 'react-native-gesture-handler';
import React, {useEffect, useState, useMemo, useReducer} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {CreateRootNavigator} from './services/router';
import api from './services/api';
import {AuthContext, loginReducer, initialState} from './context/AuthContext';

const App = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: (user) => {
        dispatch({type: 'SIGNIN', user: user});
      },
      signUp: (user) => {
        dispatch({type: 'SIGNUP', user: user});
      },
      signOut: () => {
        dispatch({type: 'SIGNOUT'});
      },
      updateUser: (user) => {
        dispatch({type: 'UPDATE_USER', user: user});
      },
    }),
    [],
  );

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
          .reAuth(token)
          .then((data) => {
            if (data.user) {
              dispatch({type: 'REAUTH', user: data.user});
            } else {
              alert(data.message);
              dispatch({type: 'SIGNOUT'});
            }
          })
          .catch((error) => console.log(error));
      } else {
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
    <AuthContext.Provider value={{authContext: authContext, state: loginState}}>
      <CreateRootNavigator signedIn={loginState.signedIn} />
    </AuthContext.Provider>
  );
};

export default App;
