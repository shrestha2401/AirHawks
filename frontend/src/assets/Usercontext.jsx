import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flightsAttended, setFlightsAttended] = useState(0);
  const [flightDetails, setFlightDetails] = useState([]);

  const addFlightDetail = (flight) => {
    setFlightDetails([...flightDetails, flight]);
    setFlightsAttended(flightsAttended + 1);
  };

  return (
    <UserContext.Provider value={{ 
      name, setname, 
      email, setEmail, 
      password, setPassword,
      flightsAttended, setFlightsAttended,
      flightDetails, setFlightDetails,
      addFlightDetail 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
