import React, { useState, createContext } from "react";

export const RoutingData = createContext();

const RoutingDataProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [loggedInAs, setLoggedInAs] = useState("doctor");

  return (
    <RoutingData.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loggedInAs,
        setLoggedInAs,
        userId,
        setUserId,
      }}
    >
      {children}
    </RoutingData.Provider>
  );
};

export default RoutingDataProvider;
