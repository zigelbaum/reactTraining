import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

interface AuthActions {
  loginn: () => void;
  // checkLoggedin: () => void;
  //   logout: () => void;
  // isLoggedIn: boolean;
}

const useAuth = (): AuthActions => {
  
  const handleLogin = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };

  

  //   const handleLogout = () => {
  //     // Perform logout logic (if needed)
  //     // Dispatch the LOGOUT action
  //     dispatch(logout());
  //   };

  return {
    loginn: handleLogin,
    // checkLoggedin: checkLoggedIn,
    // logout: handleLogout,
    // isLoggedIn,
  };
};

export default useAuth;
