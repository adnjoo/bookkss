import { useState } from "react";
import axios from "axios";

import { serverUrl } from "../lib/helpers";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(`${serverUrl}/users/login`, {
      email,
      password,
    });
    if (res.data) {
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    }
  };

  return (
    <div className="my-64 mx-auto flex justify-center">
      <div className="w-1/3">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={login}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
