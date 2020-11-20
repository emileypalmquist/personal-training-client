import React, {useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import WorkoutCard from '../components/WorkoutCard';

export default Workouts = () => {
  const {
    state: {workouts},
  } = useContext(AuthContext);

  const renderWorkouts = () => {
    return workouts.map((w) => <WorkoutCard key={w.id} workout={w} />);
  };

  return (
    <>
      <ScrollView>
        <View>{renderWorkouts()}</View>
      </ScrollView>
    </>
  );
};
