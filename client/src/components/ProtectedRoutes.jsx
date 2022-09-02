import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem('chat-user');

  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  );
}

export default ProtectedRoutes