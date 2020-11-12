import React, {Component, useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Image} from 'react-native-elements';

import {AuthContext} from '../context/AuthContext';

export default Home = () => {
  const {
    state: {
      user: {name},
    },
  } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView />
      <View style={styles.main}>
        <Text style={styles.header}>Welcome Back, {name}</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://images.unsplash.com/photo-1594400825825-a4d364ea1a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=80',
        }}
      />
      <Text style={styles.quote}>
        The harder you work for something, the greater you'll feel when you
        achieve it.
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
  },
  header: {
    fontSize: 30,
  },
  image: {
    marginHorizontal: 20,
    height: 400,
    maxWidth: '100%',
  },
  quote: {
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 50,
    marginTop: 50,
  },
});
