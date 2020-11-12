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

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const persistAuthHeaders = (token) => {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

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
      if (data.message) {
        alert(data.message);
      } else {
        setToken(data.token);
        return data;
      }
    })
    .catch((error) => alert(error));
};

const signUp = (user) => {
  return fetch(API_ROOT + '/signup', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors);
      } else {
        setToken(data.token);
        return data;
      }
    })
    .catch((error) => alert(error));
};

const reAuth = (token) => {
  return fetch(API_ROOT + '/reauth', {
    method: 'GET',
    headers: persistAuthHeaders(token),
  }).then((resp) => resp.json());
};

const setToken = async (token) => {
  await AsyncStorage.setItem('token', JSON.stringify(token));
};

const signOut = async () => {
  await AsyncStorage.removeItem('token');
};

export default {
  auth: {
    signIn,
    signUp,
    signOut,
    reAuth,
    getToken,
  },
};
