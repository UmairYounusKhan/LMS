import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Config/Firebase";
// import { auth } from './firebase'; // Adjust the import path as needed

const AuthRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is authenticated
        setIsAuthenticated(true);
      } else {
        // User is not authenticated
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally, show a loading spinner while checking authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to={"/students/students-list"} /> : <Outlet />;
};

export default AuthRoute;
