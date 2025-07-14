import React, { useEffect, useState } from "react";
import { MyContext } from "./MyContext.js";

const MyContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ isAuthenticated: false });
  const [appLoading, setAppLoading] = useState(false);

  const getUser = async () => {
    try {
      setAppLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      const { isSuccess, data } = result;
      if (isSuccess == true) {
        setUser({
          isAuthenticated: true,
          ...data.user,
        });
      } else {
        alert("Please login again!");
      }
    } catch (err) {
      alert("User Validation Failed:", err.message);
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const valueObj = { count, setCount, user, appLoading };

  return <MyContext.Provider value={valueObj}>{children}</MyContext.Provider>;
};

export { MyContextProvider };
