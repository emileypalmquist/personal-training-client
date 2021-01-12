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
  const vacation = {key: 'vacation', color: 'blue', selectedDotColor: 'white'};
  const massage = {key: 'massage', color: 'purple', selectedDotColor: 'white'};
  const workout = {key: 'workout', color: 'black', selectedDotColor: 'white'};
  return (
    <>
      <View>
        <Calendar
          // theme={{
          //   backgroundColor: 'b6c1cd',
          //   selectedDayBackgroundColor: '#00adf5',
          // }}
          minDate={date}
          markedDates={{
            '2020-10-25': {
              dots: [vacation, workout],
              selected: true,
            },
            '2020-10-26': {dots: [massage, workout], disabled: true},
          }}
          markingType={'multi-dot'}
          onDayPress={(day) => console.log(day)}
        />
      </View>
      <View>{displayAvailibility()}</View>
    </>
  );
};
