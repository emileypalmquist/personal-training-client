import React, {Component, useMemo} from 'react';

export const AuthContext = React.createContext();

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
        user: {},
      };
    case 'REAUTH':
      return {
        ...prevState,
        signedIn: true,
        isLoading: false,
        user: action.user,
      };
    default:
      return prevState;
  }
};

export const initialState = {
  isLoading: true,
  signedIn: false,
  user: {},
};
