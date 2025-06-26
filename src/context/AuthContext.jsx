import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";

const getToken = () => localStorage.getItem("token");

const checkTokenValidity = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt_decode.default(token);
    return decoded.exp * 1000 > Date.now(); // still valid
  } catch {
    localStorage.removeItem("token");
    return false;
  }
};

const useAuth = () => {
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(checkTokenValidity(token));

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key === "token") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  useEffect(() => {
    setIsAuthenticated(checkTokenValidity(token));
  }, [token]);

  return { isAuthenticated, token, setToken };
};

export default useAuth; // ✅ THIS LINE FIXES YOUR ERROR
