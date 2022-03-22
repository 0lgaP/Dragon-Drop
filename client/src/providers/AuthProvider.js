import {createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const storedAuthID = window.localStorage.getItem("user_id")
  const storedAuthEmail = window.localStorage.getItem("user_email")
  const parsedAuthID = JSON.parse(storedAuthID);
  const parsedAuthEmail = JSON.parse(storedAuthEmail);

  const [auth, setAuth] = useState({user_id: parsedAuthID, email: parsedAuthEmail});
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;