import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

const SignUp = ({navigation}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const {
    authContext: {signUp},
  } = useContext(AuthContext);

  const createFormData = () => {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('birthdate', birthdate);
    if (profilePhoto) {
      formData.append('profile_photo', {
        name: 'profile-photo',
        type: profilePhoto.type,
        uri:
          Platform.OS === 'android'
            ? profilePhoto.uri
            : profilePhoto.uri.replace('file://', ''),
      });
    }
    return formData;
  };

  const handleSignUp = () => {
    const formData = createFormData();

    if (password === passwordConfirmation) {
      api.auth.signUp(formData).then((data) => {
        if (data.user) signUp(data.user);
      });
    } else {
      alert('passwords must match');
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setProfilePhoto(response);
      }
    });
  };

  // const updateBirthdate = (date) => {
  //   setBirthdate(date);
  // };

  return (
    <>
      <SafeAreaView />
      <View styles={styles.master}>
        <Text style={styles.header}>Sign Up</Text>
        <Input
          placeholder="name"
          name="name"
          value={name}
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={setName}
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
          placeholder="birthdate: MM-DD-YYYY"
          name="birthdate"
          leftIcon={{type: 'font-awesome', name: 'birthday-cake'}}
          value={birthdate}
          onChangeText={setBirthdate}
        />

        {profilePhoto && (
          <Image
            source={{uri: profilePhoto.uri}}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
        )}
        <Button
          title="Choose Profile Photo"
          onPress={handleChoosePhoto}
          style={styles.button}
          buttonStyle={{backgroundColor: '#A68FB1'}}
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
