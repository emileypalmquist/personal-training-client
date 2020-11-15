import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import api from '../services/api';

export default Sessions = () => {
  const [availability, setAvailability] = useState([]);
  let date = new Date();
  useEffect(() => {
    // api.availability
    //   .getTodaysAvailibility(date)
    //   .then((data) => setAvailability(data));
  }, []);

  const displayAvailibility = () => {
    availability.map((a) => <Text>{a.location}</Text>);
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
