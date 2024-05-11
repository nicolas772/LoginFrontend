import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Loader from "./Loader";
import { getCurrentUser } from 'aws-amplify/auth';
import Prueba from "./Prueba";

const ProtectedRoutes = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function currentAuthenticatedUser() {
         try {
            const { userId } = await getCurrentUser();
            setCurrentUser(userId);
         } catch (err) {
            //console.error(err);
         } finally {
            setLoading(false);
         }
      }
      currentAuthenticatedUser();
   }, []);

   if (loading) {
      return <Loader />;
   }

   // Si el usuario no está autenticado, redirecciona a la página de inicio de sesión
   if (!currentUser) {
      return <Navigate to="/login" />;
   }

   // Si el usuario está autenticado, muestra las rutas protegidas
   return (
      <div>
         <main>
            <Routes>
               <Route path="/home" element={<Home />} />
               <Route path="/prueba" element={<Prueba />} />
            </Routes>
         </main>
      </div>
   );
};

export default ProtectedRoutes;
