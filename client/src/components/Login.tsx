// Login.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    // Make a request to check if the user is authenticated
    fetch("/auth/isauth")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="my-64 mx-auto flex justify-center">
      {user ? (
        <div>
          Welcome, {user?.displayName}!<br />
          Email: {user?.email}
          <br />
          <img src={user?.picture} alt="Profile" />
        </div>
      ) : (
        <a href="/auth/google">Login with Google</a>
      )}
    </div>
  );
}

export default Login;
