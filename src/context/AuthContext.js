import React from 'react';

export const AuthContext = React.createContext();

export const initialState = {
  isLoading: true,
  signedIn: false,
  user: {workouts: []},
};

export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
      };
    case 'SIGNUP':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
      };
    case 'SIGNOUT':
      return {
        ...prevState,
        signedIn: false,
        isLoading: false,
        user: {workouts: []},
      };
    case 'REAUTH':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
      };
    case 'UPDATE_USER':
      console.log(action.user);
      return {
        ...prevState,
        user: action.user,
      };
    default:
      return prevState;
  }
};
