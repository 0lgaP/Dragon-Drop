import {createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;