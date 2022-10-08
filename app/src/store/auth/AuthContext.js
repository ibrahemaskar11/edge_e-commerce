import React, { useState, useEffect, useCallback } from "react";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, user, expirationTime) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 3600) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!tokenData;
  const logoutHandler = () => {
    setToken(null);
    localStorage.clear("expirationTime");
    localStorage.clear("authToken");
    localStorage.clear("email");
    localStorage.clear("username");
    localStorage.clear("userId");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  const loginHandler = (token, user, expirationTime) => {
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userId", user._id);
    const remaningTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remaningTime);
  };

  
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    } else {
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
