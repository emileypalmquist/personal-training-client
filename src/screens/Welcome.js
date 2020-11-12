import React, {Component} from 'react';
import {Button, Image} from 'react-native-elements';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';

class Welcome extends Component {
  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to Melana's Personal Training</Text>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://images.unsplash.com/photo-1594400825825-a4d364ea1a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=80',
            }}
          />
          <Button
            style={styles.topButton}
            buttonStyle={{backgroundColor: '#A68FB1'}}
            title="Sign In"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
          <Button
            style={styles.button}
            buttonStyle={{backgroundColor: '#A68FB1'}}
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 15,
  },
  image: {
    height: 300,
  },
  button: {
    paddingTop: 5,
  },
  topButton: {
    paddingTop: 20,
  },
});

export default Welcome;
