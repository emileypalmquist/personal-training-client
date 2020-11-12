import React, {useContext} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

export default Goals = () => {
  const {
    state: {
      user: {name},
    },
  } = useContext(AuthContext);

  return (
    <>
      <SafeAreaView />
      <View>
        <Text>{name}</Text>
      </View>
    </>
  );
};
