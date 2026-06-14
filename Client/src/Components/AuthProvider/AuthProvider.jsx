import React, { createContext, useState, useEffect } from "react";

import Instance from "../../axiosConfig";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    async function checkUser() {
      try {
        const response = await Instance.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          username: response.data.username,
          userid: response.data.userid,
        });
      } catch (error) {
        setUser(null);
      }
    }

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
