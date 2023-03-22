import jwtDecode from "jwt-decode";
import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axios = useAxios();
  const navigate = useNavigate();

  const registerUser = async (
    email,
    password,
    setLoading,
    setErrorMessage,
    setMessage
  ) => {
    setLoading(true);
    await axios
      .post("auth/register/", { email, password })
      .then((res) => {
        setMessage("Account created successfully");
      })
      .catch((e) => setErrorMessage("Account with this email already exists"))
      .finally(() => setLoading(false));
  };

  const loginUser = async (email, password, setLoading, setErrorMessage) => {
    setLoading(true);
    await axios
      .post("auth/jwt/login/", { email, password })
      .then((res) => {
        if (res.status === 200) {
          const tokens = res.data;
          const decodedAccessToken = jwtDecode(tokens.access);
          const user = {
            id: decodedAccessToken.user_id,
            email: decodedAccessToken.email,
          };

          LocalStorageAPI.setLocalStorageWatchlist(
            decodedAccessToken.watchlist
          );
          LocalStorageAPI.setLocalStorageTokens(tokens);
          LocalStorageAPI.setLocalStorageUser(user);

          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage("User account not found or inactive");
      })
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    LocalStorageAPI.delLocalStorageWatchlist();
    LocalStorageAPI.delLocalStorageTokens();
    LocalStorageAPI.delLocalStorageUser();

    navigate("/auth");
  };

  const user = LocalStorageAPI.getLocalStorageUser();

  const context = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
