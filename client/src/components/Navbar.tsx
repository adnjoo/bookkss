import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import axios from "axios";

import { logOut, serverUrl } from "../lib/helpers";
import Banner from "./Banner";

export function Navbar() {
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios
        .get(`${serverUrl}/users/is-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    }
  }, []);

  return (
    <nav>
      <div>
        <Banner />
        <div className="mt-4 flex justify-between lg:mx-64">
          <div id="left" className="flex flex-row gap-4">
            <button onClick={() => setExpanded(!expanded)}>
              <img src="/logo-long.png" className="hidden w-24 sm:flex" />
            </button>
            {user && (
              <div className="flex hidden gap-2 sm:flex">
                <a href="/dashboard">Dashboard</a>
                <a href="/archive">Archive</a>
                <a href="/discover">Discover</a>
              </div>
            )}
            <button onClick={() => setExpanded(!expanded)}>
              <AiOutlineMenu className="flex h-6 w-6 sm:hidden" color="black" />
            </button>
          </div>
          <a href="/">
            <img src="/logo.png" className="flex w-12 sm:hidden" />
          </a>
          <div id="right" className="flex">
            {!user && (
              <Link to="/login" className="hidden sm:flex">
                <AiOutlineLogin className="flex h-6 w-6" />
              </Link>
            )}
            {user && (
              <button onClick={logOut} className="hidden sm:flex">
                <AiOutlineLogout className="flex h-6 w-6" />
              </button>
            )}
          </div>
        </div>
        {expanded && (
          <div className="flex flex-col gap-2 sm:hidden">
            {/* <a href="/dashboard">Dashboard</a> */}
            {/* <a href="/archive">Archive</a> */}
            {/* <a href="/discover">Discover</a> */}
          </div>
        )}
      </div>
    </nav>
  );
}
