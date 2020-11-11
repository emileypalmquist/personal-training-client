import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import {AuthContext} from '../context/AuthContext';

export default class Home extends Component {
  render() {
    return (
      <>
        <SafeAreaView />
        <Icon name="menu" size={40} />
        <View style={styles.main}>
          <Text>Welcome</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://images.unsplash.com/photo-1594400825825-a4d364ea1a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=80',
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  image: {
    height: 300,
  },
});
