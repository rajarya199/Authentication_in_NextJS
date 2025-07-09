"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
// createContext: Creates a context object.

// useContext: Allows components to access context.

interface User {
  _id: string;
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
   // Optional: Load user once when app loads
  const fetchUser = async () => {
    try {
      const res = await axios.post("/api/users/about");
      setUser(res.data.data);
    } catch (err) {
      setUser(null); // clear user if error (unauthenticated)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return(
    // Makes user, setUser, and fetchUser available to any component inside this provider.
     <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

// useUser() is a custom hook to easily access user, setUser, and fetchUser in any component.
export const useUser = () => {

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};