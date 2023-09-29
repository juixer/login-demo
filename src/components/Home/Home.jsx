import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="hero min-h-screen -mt-16"
      style={{
        backgroundImage:
          "url(https://w.wallhaven.cc/full/2y/wallhaven-2y2wg6.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            This is a Login Practice Application! if you are here to help me out
            thanks a lot.
          </p>
          <div className="flex justify-evenly">
            <Link to={"/signin"}>
              <button className="btn btn-primary bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Sign In</button>
            </Link>
            <Link to={"/signup"}>
              <button className="btn btn-primary bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
