import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../context/AuthContext';

import api from '../services/api';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, user} = useContext(AuthContext);
  const handleSignUp = () => {
    api.auth
      .signIn({
        username,
        password,
      })
      .then((data) => {
        if (data.user) signIn(data.user);
      });
  };

  return (
    <>
      <SafeAreaView />
      <View styles={styles.main}>
        <Text style={styles.header}>Please Sign In</Text>
        <Input
          placeholder="username"
          name="username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="password"
          password="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          buttonStyle={{backgroundColor: '#A68FB1'}}
          style={styles.button}
          title="Sign In"
          onPress={handleSignUp}
        />
        <Text style={styles.resetPass}>Forgot Password?</Text>
        <View style={styles.link}>
          <Text style={styles.text}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('Sign Up')}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
  },
  header: {
    fontSize: 32,
    marginBottom: 18,
    alignSelf: 'center',
    paddingTop: 200,
  },
  text: {
    fontSize: 16,
    marginTop: 16,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
  },
  resetPass: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignSelf: 'flex-end',
    fontSize: 18,
  },
});

export default SignIn;
