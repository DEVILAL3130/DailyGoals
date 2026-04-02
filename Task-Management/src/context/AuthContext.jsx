// import React, { createContext, useContext, useEffect, useState } from "react";
// import API from "../api/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("user")) || null;
//   });

//   const signup = async (formData) => {
//     const { data } = await API.post("/auth/signup", formData);
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const login = async (formData) => {
//     const { data } = await API.post("/auth/login", formData);
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const getMe = async () => {
//     if (!user?.token) return;
//     try {
//       const { data } = await API.get("/auth/me");
//       setUser((prev) => ({ ...prev, ...data }));
//     } catch (error) {
//       logout();
//     }
//   };

//   useEffect(() => {
//     getMe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   return useContext(AuthContext);
// }
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const signup = async (formData) => {
    const { data } = await API.post("/auth/signup", formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getMe = async () => {
    if (!user?.token) return;
    try {
      const { data } = await API.get("/auth/me");
      setUser((prev) => ({ ...prev, ...data }));
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}