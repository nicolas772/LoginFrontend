import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { getCurrentUser } from 'aws-amplify/auth';
import Loader from "./components/Loader";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user)
      } catch (err) {
        //console.error(err)
        console.log("no pasa nada amigo")
      } finally {
        setLoading(false)
      }
    }
    currentAuthenticatedUser()
  }, [])

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <Routes>
      {/* Redireccionar a la página de inicio si el usuario está autenticado */}
      {currentUser && <Route path="/" element={<Navigate to="/home" />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default App;
