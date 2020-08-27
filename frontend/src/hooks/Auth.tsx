import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface AuthState {
  token: string;
  user: object;
}

interface SignCredetials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: object;
  singIn(credentials: SignCredetials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Gobarber:token");
    const user = localStorage.getItem("@Gobarber:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem("@Gobarber:token", token);
    localStorage.setItem("@Gobarber:user", JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Gobarber:token");
    localStorage.removeItem("@Gobarber:user");
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        singIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
