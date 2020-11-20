import React, {useEffect, useState, useContext} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';

export default Sessions = () => {
  const [availability, setAvailability] = useState([]);
  const {
    authContext: {signOut},
    state: {appointments},
  } = useContext(AuthContext);

  let date = new Date();
  useEffect(() => {
    // api.availability
    //   .getMonthsAvailibility(date)
    //   .then((data) => setAvailability(data));
  }, []);

  const displayAvailibility = () => {
    return availability.map((a) => <Text>{a.location}</Text>);
  };

  return (
    <>
      <SafeAreaView />
      <View>
        <Calendar minDate={date} />
        {displayAvailibility()}
      </View>
    </>
  );
};
