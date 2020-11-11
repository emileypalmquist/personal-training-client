import React, {useContext} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

export default Profile = () => {
  const {signOut, user} = useContext(AuthContext);

  const handleSignout = () => {
    api.auth.signOut();
    signOut();
  };
  console.log(user);
  return (
    <>
      <SafeAreaView />
      <View>
        <Text onPress={handleSignout}>Logout</Text>
        <Text>Profile</Text>
      </View>
    </>
  );
};
