import React, { createContext, useState ,useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flightsAttended, setFlightsAttended] = useState(0);
  const [flightDetails, setFlightDetails] = useState([]);
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedFlightsAttended = localStorage.getItem('flightsAttended');
    const storedFlightDetails = localStorage.getItem('flightDetails');

    if (storedName) setname(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedFlightsAttended) setFlightsAttended(parseInt(storedFlightsAttended, 10));
    if (storedFlightDetails) setFlightDetails(JSON.parse(storedFlightDetails));
  }, []);
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('flightsAttended', flightsAttended);
    localStorage.setItem('flightDetails', JSON.stringify(flightDetails));
  }, [name, email, flightsAttended, flightDetails]);
  const logout = () => {
    setname("");
    setEmail("");
    setPassword("");
    setFlightsAttended(0);
    setFlightDetails([]);
    localStorage.clear();
  };
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
      addFlightDetail ,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
