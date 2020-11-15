import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ROOT = 'http://localhost:3000/api/v1';

const getToken = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    return JSON.parse(token);
  } catch (e) {
    console.log(e);
  }
};

// headers
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const authHeaders = (token) => {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

// handle auth token in asyncstorage
const setToken = async (token) => {
  await AsyncStorage.setItem('token', JSON.stringify(token));
};

const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

// auth
const signIn = (user) => {
  return fetch(API_ROOT + '/login', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.message ? alert(data.message) : setToken(data.token);
      return data;
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong. Please try again.');
    });
};

const signUp = (formData) => {
  return fetch(API_ROOT + '/signup', {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.errors ? alert(data.errors) : setToken(data.token);
      return data;
    })
    .catch((error) => alert(error));
};

const reAuth = (token) => {
  // persist user with jwt token
  return fetch(API_ROOT + '/reauth', {
    method: 'GET',
    headers: authHeaders(token),
  }).then((resp) => resp.json());
};

// update user
const patchUser = (token, id, data) => {
  return fetch(API_ROOT + `/users/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .catch((error) => console.error(error));
};

export default {
  auth: {
    signIn,
    signUp,
    removeToken,
    reAuth,
    getToken,
  },
  user: {
    patchUser,
  },
};
