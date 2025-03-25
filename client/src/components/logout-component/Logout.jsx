import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout({ setUser }) {
    useEffect(() => {
        localStorage.removeItem("authToken");
        setUser(null);
    }, []);

    return <Navigate to="/" />;
}