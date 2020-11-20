import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

export default WorkoutCard = ({workout}) => {
  if (workout) {
    const {activity, frequency, info} = workout;
    return (
      <>
        <SafeAreaView />

        <Card style={styles.card}>
          <Card.Title>{activity}</Card.Title>
          <Card.Title>{frequency} times this week</Card.Title>
          <Card.Title>{info}</Card.Title>
        </Card>
      </>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  card: {
    borderStyle: 'dotted',
  },
});
