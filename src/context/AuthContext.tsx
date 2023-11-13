import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../service/firebase";

type AuthContextData = {
  signed: boolean;
  loading: boolean;
  user: UserProps | null;
  handleInfoUser: ({ name, email, uid }: UserProps) => void;
};

interface AuthProviderProps {
  children: React.ReactNode;
}
interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const handleInfoUser = ({ email, name, uid }: UserProps) => {
    setUser({
      name,
      email,
      uid,
    });
  };
  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, handleInfoUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
