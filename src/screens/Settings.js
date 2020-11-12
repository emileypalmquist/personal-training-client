import React, {useContext} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

export default Settings = () => {
  const {
    authContext: {signOut},
    state: {
      user: {name},
    },
  } = useContext(AuthContext);

  const handleSignout = () => {
    api.auth.signOut();
    signOut();
  };

  return (
    <>
      <SafeAreaView />
      <View>
        <Text onPress={handleSignout}>Logout</Text>
        <Text>{name}</Text>
      </View>
    </>
  );
};
