import { createContext, useEffect, useState } from "react";
import {
  authLogin,
  authCreateUser,
  authLogout,
  authRefreshToken,
  authCheckUser,
} from "../features/services/auth.service";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async data => {
    try {
      setLoading(true);
      const res = await authLogin(data);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const signup = async data => {
    try {
      setLoading(true);
      return await authCreateUser(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    return await authRefreshToken();
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await authCheckUser();
      setUser(res.user);
    } catch {
      try {
        await authRefreshToken();
        const retryRes = await authCheckUser();
        setUser(retryRes.user);
      } catch {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshToken,
        checkAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
