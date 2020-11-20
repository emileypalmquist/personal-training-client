import React, {useContext, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import WorkoutCard from '../components/WorkoutCard';
import api from '../services/api';

export default Workout = ({navigation}) => {
  const {
    authContext: {},
    state: {workouts},
  } = useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        {workouts.length > 0 ? (
          <>
            <View>
              <WorkoutCard workout={workouts[0]} />
            </View>
            {workouts.length > 1 && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Workouts')}>
                <Text style={styles.buttonText}>All Workouts</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text>You have no workouts at this time</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#A68FB1',
  },
  buttonText: {
    color: 'white',
  },
  container: {
    alignItems: 'center',
  },
});
