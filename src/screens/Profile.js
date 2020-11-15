import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import EditUserModal from '../components/EditUserModal';

import {AuthContext} from '../context/AuthContext';
import api from '../services/api';

export default Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    authContext: {signOut},
    state: {
      user: {name, birthdate, email, profile_photo},
    },
  } = useContext(AuthContext);

  const handleSignout = () => {
    api.auth.removeToken();
    signOut();
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  //hacky way to get an alt url need to refactor
  const photoUri = () => {
    return profile_photo && profile_photo.split('')[0] === 'h'
      ? profile_photo
      : 'http://localhost:3000' + profile_photo;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{
          uri: photoUri(),
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{birthdate}</Text>
          <Text style={styles.email}>{email}</Text>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleShowModal}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <EditUserModal setModalVisible={setModalVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#A68FB1',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    alignItems: 'center',
    paddingTop: 80,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#A68FB1',
  },
  buttonText: {
    color: 'white',
  },
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
  },
  modalButton: {
    backgroundColor: '#A68FB1',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 20,
  },
});
