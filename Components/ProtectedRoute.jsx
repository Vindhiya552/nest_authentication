// export default ProtectedRoute;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null); // null = loading, true = logged in, false = logged out

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/check", { withCredentials: true })
      .then((res) => {
        if (res.data.auth) setAuth(true);
        else setAuth(false);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  return auth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
