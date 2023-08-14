// import { useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <div className="mb-10 mt-20">
        <div className="mx-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Expand your knowledge
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Bookkss empowers you to track your reading and access book reviews
            for future reference.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              // onClick={handleGoogleSignIn}
              className="rounded-xl bg-gray-500 p-3 text-white"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 bg-gray-100 py-10">
        <div className="mx-auto flex max-w-3xl flex-col-reverse px-4 sm:flex-row">
          <div className="sm:w-1/2">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">
              Book Reviews and Recommendations
            </h2>
            <p className="mx-4 my-6 text-lg text-gray-600">
              Bookkss allows you to read and write book reviews, at your own
              leisure. Save reviews for future reference, and discover exciting
              new books to read.
            </p>
          </div>
          <div className="flex justify-center sm:w-1/2">
            <img src="/landing-section1.png" alt="dashboard preview" />
          </div>
        </div>
      </div>
      <div className="my-4 bg-gray-100 py-10">
        <div className="mx-auto flex max-w-3xl flex-col-reverse px-4 sm:flex-row">
          <div className="sm:w-1/2">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">
              Discover New Books
            </h2>
            <p className="mx-4 my-6 text-lg text-gray-600">
              Bookkss helps you to discover book reviews by other users, and
              learn from their experiences.
            </p>
          </div>
          <div className="flex justify-center sm:w-1/2">
            <img src="/landing-section2.png" alt="discover preview" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
