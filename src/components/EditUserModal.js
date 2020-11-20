import React, {useContext, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

export default EditUserModal = ({setModalVisible}) => {
  const {
    authContext: {updateUser},
    state: {
      user: {id, name, email, birthdate},
    },
  } = useContext(AuthContext);

  const [newName, setName] = useState(name);
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [newBirthdate, setBirthdate] = useState(birthdate);

  const handleEdit = async () => {
    let data;
    passwordConfirmation && password
      ? (data = {
          name: newName,
          email: newEmail,
          birthdate: newBirthdate,
          password,
          password_confirmation: passwordConfirmation,
        })
      : (data = {
          name: newName,
          email: newEmail,
          birthdate: newBirthdate,
        });
    let token = null;

    try {
      token = await api.auth.getToken();
    } catch (e) {
      console.log(e);
    }
    if (token) {
      api.user
        .patchUser(token, id, data)
        .then((data) =>
          data.user ? handleSuccessfulUpdate(data.user) : alert(data.message),
        );
    }
  };

  const handleSuccessfulUpdate = (user) => {
    updateUser(user);
    setModalVisible(false);
  };

  return (
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(false)}>
        <Text style={styles.modalButtonText}>X</Text>
      </TouchableOpacity>
      <Input
        placeholder="name"
        name="name"
        value={newName}
        leftIcon={{type: 'font-awesome', name: 'user'}}
        onChangeText={setName}
      />
      <Input
        placeholder="email"
        name="email"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        value={newEmail}
        onChangeText={setEmail}
      />
      <Input
        placeholder="birthdate: MM-DD-YYYY"
        name="birthdate"
        leftIcon={{type: 'font-awesome', name: 'birthday-cake'}}
        value={newBirthdate}
        onChangeText={setBirthdate}
      />
      <Input
        placeholder="password"
        name="password"
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="password confirmation"
        name="passwordConfirmation"
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <Button
        title="Update"
        buttonStyle={{backgroundColor: '#A68FB1'}}
        style={styles.button}
        onPress={handleEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 200,
    height: 500,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    color: 'black',
    alignSelf: 'center',
  },
  modalButtonText: {
    color: 'black',
    padding: 2,
  },
  modalButton: {
    backgroundColor: '#A68FB1',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 15,
  },
});
