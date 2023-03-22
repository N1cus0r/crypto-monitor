import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const PrivateRoute = () => {
  const tokens = LocalStorageAPI.getLocalStorageTokens();
  const user = LocalStorageAPI.getLocalStorageUser();

  return user && tokens ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
