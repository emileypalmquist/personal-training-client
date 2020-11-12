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

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const {
    authContext: {signUp},
  } = useContext(AuthContext);

  const handleSignUp = () => {
    if (password === passwordConfirmation) {
      api.auth
        .signUp({
          username,
          email,
          name,
          password,
          password_confirmation: passwordConfirmation,
          birthdate: new Date(birthdate),
        })
        .then((data) => {
          if (data.user) signUp(data.user);
        });
    } else {
      alert('passwords must match');
    }
  };

  return (
    <>
      <SafeAreaView />
      <View styles={styles.master}>
        <Text style={styles.header}>Sign Up</Text>
        <Input
          placeholder="name"
          name="name"
          value={name}
          leftIcon={{type: 'font-awesome', name: 'life-ring'}}
          onChangeText={setName}
        />
        <Input
          placeholder="username"
          name="username"
          value={username}
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={setUsername}
        />
        <Input
          placeholder="email"
          name="email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="password"
          name="password"
          value={password}
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="password confirmation"
          name="passwordConfirmation"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />
        <Input
          placeholder="birthdate: MM/DD/YYYY"
          name="birthdate"
          leftIcon={{type: 'font-awesome', name: 'birthday-cake'}}
          value={birthdate}
          onChangeText={setBirthdate}
        />
        <Button
          title="Sign Up"
          buttonStyle={{backgroundColor: '#A68FB1'}}
          style={styles.button}
          onPress={handleSignUp}
        />
        <View style={styles.link}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  master: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    fontSize: 32,
    marginBottom: 18,
    alignSelf: 'center',
    paddingTop: 120,
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
});

export default SignUp;
