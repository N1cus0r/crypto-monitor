import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Watchlist from "../pages/Watchlist";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
