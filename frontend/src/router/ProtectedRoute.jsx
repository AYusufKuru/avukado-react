// src/router/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("avukado_token");
    return token ? <Outlet /> : <Navigate to="/giris" replace />;
}
