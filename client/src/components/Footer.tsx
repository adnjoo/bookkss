import { Link } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <Link to="/">
              <h3 className="text-lg font-bold">bookkss</h3>
            </Link>
            <p className="mt-2 hidden sm:flex">
              Helping you write and share book reviews.
            </p>
            <Link to="/about-us" className="mt-2">
              About Us
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="mt-2 flex flex-col">
              <span className="mb-1">
                <Link to="/">Home</Link>
              </span>
              <span className="mb-1">
                <Link to="/dashboard">Dashboard</Link>
              </span>
              <span className="mb-1">
                <Link to="/discover">Discover</Link>
              </span>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
            <ul className="mt-2">
              <span className="mb-1">
                <a
                  href="https://linkedin.com/company/bookkssco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition duration-150 ease-in-out"
                >
                  <AiFillLinkedin size={24} />
                </a>
              </span>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-gray-700" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Bookkss. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
