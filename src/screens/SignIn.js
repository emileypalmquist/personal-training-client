import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Input, Button} from 'react-native-elements';

import {AuthContext} from '../context/AuthContext';

import api from '../services/api';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    authContext: {signIn},
  } = useContext(AuthContext);
  const handleSignIn = () => {
    api.auth
      .signIn({
        email,
        password,
      })
      .then((data) => {
        data.user ? signIn(data.user) : alert('something went wrong');
      });
  };

  return (
    <>
      <SafeAreaView />
      <View styles={styles.main}>
        <Text style={styles.header}>Please Sign In</Text>
        <Input
          placeholder="email"
          name="email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="password"
          password="password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          buttonStyle={{backgroundColor: '#A68FB1'}}
          style={styles.button}
          title="Sign In"
          onPress={handleSignIn}
        />
        <Text style={styles.resetPass}>Forgot Password?</Text>
        <View style={styles.link}>
          <Text style={styles.text}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('SignUp')}>
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
