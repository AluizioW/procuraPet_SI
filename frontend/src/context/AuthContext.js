import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error("Falha ao buscar o token do armazenamento", e);
      }
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const login = async (token) => {
    setUserToken(token); 
    await AsyncStorage.setItem('userToken', token);
  };

  const logout = async () => {
    setUserToken(null); 
    await AsyncStorage.removeItem('userToken'); 
  };

  const value = {
    userToken,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};