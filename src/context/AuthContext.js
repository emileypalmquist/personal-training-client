import React from 'react';

export const AuthContext = React.createContext();

export const initialState = {
  isLoading: true,
  signedIn: false,
  user: {},
  workouts: [],
  appointments: [],
};

export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
        workouts: action.user.workouts,
        appointments: action.user.appointments,
      };
    case 'SIGNUP':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
        workouts: action.user.workouts,
      };
    case 'SIGNOUT':
      return {
        ...prevState,
        signedIn: false,
        isLoading: false,
        user: {},
        workouts: [],
        appointments: [],
      };
    case 'REAUTH':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
        workouts: action.user.workouts,
        appointments: action.user.appointments,
      };
    case 'UPDATE_USER':
      return {
        ...prevState,
        user: action.user,
        workouts: action.user.workouts,
        appointments: action.user.appointments,
      };
    default:
      return prevState;
  }
};
