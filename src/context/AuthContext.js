import { createContext, useContext } from 'react';
// import { supabase } from '../services/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
