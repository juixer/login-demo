import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../FireBase/FireBase";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        toast.success("Login successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign Out Successfully", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setUser(null);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err);
      });
  };
  // show Password function
  const [isShow, setIsShow] = useState(true);
  const handleShowPassword = () => {
    setIsShow(!isShow);
    console.log(isShow);
  };
  // logIn function
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // login by email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if(result.user.emailVerified){
          toast.success("Login successful", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setUser(result.user);
          return;
        }else{
          toast.warn("Please check your Email and Verify your Account", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err);
      });
  };
  // forget password
  const emailRef = useRef(null)
  const handleForgetPassword = () => {
    const email = emailRef.current.value
    if(!email){
      toast.error('Please Provide an Email!!', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      toast.error('Please Provide a Valid Email!!', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      toast.success("Please Check Your Email!!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            {user ? (
              <div className="flex items-center flex-col">
                <h1 className="text-5xl">{user.displayName}</h1>
                <p className="py-3">{user.email}</p>
                <img  className="rounded-full w-28" src={user.photoURL}></img>
                <button onClick={handleSignOut} className="btn btn-info mt-5">
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
            )}
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn}>
              <div className="card-body">
                <div className="w-full px-3">
                  <h1 className="mb-2 font-semibold text-xl">Email</h1>
                  <input
                    type="email"
                    ref={emailRef}
                    name="email"
                    required
                    placeholder="Your email address"
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div className="w-full px-3">
                  <h1 className="mb-2 font-semibold text-xl">
                    Enter Your Password
                  </h1>
                  <div className="flex items-center">
                    <input
                      type={isShow ? "password" : "text"}
                      name="password"
                      required
                      placeholder="Enter Your Password"
                      className="input input-bordered input-primary w-full"
                    />
                    <span className="-ml-8" onClick={handleShowPassword}>
                      {isShow ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <label className="label">
                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                  <label className="label">
                    <Link to={"/signup"}>
                      <p className="label-text-alt">
                        Do not have an Account?{" "}
                        <span className="text-sky-500 hover:underline">
                          Sign Up
                        </span>
                      </p>
                    </Link>
                  </label>
                </div>
                {user ? (
                  <></>
                ) : (
                  <div className="flex justify-center flex-col items-center">
                    <h2 className="mb-2">Alternative Logins</h2>
                    <img
                      onClick={handleGoogleLogin}
                      className="w-10"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
                    ></img>
                  </div>
                )}
                <div className="form-control mt-3">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignIn;
