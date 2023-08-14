import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";

import Banner from "./Banner";

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav>
      <div>
        <Banner />
        <div className="mt-4 flex justify-between lg:mx-64">
          <div id="left" className="flex flex-row gap-4">
            <button onClick={() => setExpanded(!expanded)}>
              <img src="/logo-long.png" className="hidden w-24 sm:flex" />
            </button>
            <div className="flex hidden gap-2 sm:flex">
              {/* <a href="/dashboard">Dashboard</a> */}
              {/* <a href="/archive">Archive</a> */}
              {/* <a href="/discover">Discover</a> */}
            </div>
            <button onClick={() => setExpanded(!expanded)}>
              <AiOutlineMenu className="flex h-6 w-6 sm:hidden" color="black" />
            </button>
          </div>
          <a href="/">
            <img src="/logo.png" className="flex w-12 sm:hidden" />
          </a>
          <div id="right" className="flex">
            <Link to="/login" className="hidden sm:flex">
              <AiOutlineLogout className="flex h-6 w-6" />
            </Link>
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

export default Navbar;
