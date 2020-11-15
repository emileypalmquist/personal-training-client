import React, {useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import WorkoutCard from '../components/WorkoutCard';

export default Workouts = () => {
  const {
    authContext: {signOut},
    state: {
      user: {workouts},
    },
  } = useContext(AuthContext);

  const renderWorkouts = () => {
    return workouts.length > 0 ? (
      workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)
    ) : (
      <Text>You have no workouts</Text>
    );
  };

  return (
    <>
      <ScrollView>
        <View>{renderWorkouts()}</View>
      </ScrollView>
    </>
  );
};
