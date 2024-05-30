
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [finalPrice , setFinalPrice ] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail, password, setPassword ,  }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
