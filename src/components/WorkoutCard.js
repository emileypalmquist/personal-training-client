import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

export default WorkoutCard = ({workout: {activity, frequency, info}}) => {
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
};

const styles = StyleSheet.create({
  card: {
    borderStyle: 'dotted',
  },
});
