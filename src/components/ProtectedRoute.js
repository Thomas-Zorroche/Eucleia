import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
