import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../FireBase/FireBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const SignUp = () => {
  const [isShow, setIsShow] = useState(true);
  const handleShowPassword = () => {
    setIsShow(!isShow);
  };
  //   Form Functions
  const handelSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const checkbox = e.target.terms.checked;

    // conditions
    if (password !== confirmPassword) {
      toast.error("Password Did Not Matched!!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])/.test(password)
    ) {
      toast.error("Password does not meet requirements!!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else if (!checkbox) {
      toast.error("Please Accept Our Terms and Conditions!!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else if (!/^.{6,}$/.test(password)) {
      toast.error("Password should be at least 6 Characters !!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // create new user function
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("SignUp successful", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        updateProfile(result.user,{
            displayName: name,
            photoURL: 'https://nft-toolbox-img.s3.us-east-1.amazonaws.com/377508-1679942249921-ezgif.com-resize%20%284%29.gif'
        })
        .then(()=>{
            console.log('Profile updated');
        })
        .catch(err=>{
            console.log(err.message);
        })

        sendEmailVerification(result.user)
        .then(()=> {
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
        })
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

  return (
    <div className="container mx-auto my-10">
      <form onSubmit={handelSignUp}>
        <div className="flex flex-col space-y-5 justify-center items-center">
        <div className="w-full px-3 lg:w-1/4">
            <h1 className="mb-2 font-semibold text-xl">Name</h1>
            <input
              type="name"
              name="name"
              required
              placeholder="Your Name"
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="w-full px-3 lg:w-1/4">
            <h1 className="mb-2 font-semibold text-xl">Email</h1>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="w-full px-3 lg:w-1/4">
            <h1 className="mb-2 font-semibold text-xl">Enter Your Password</h1>
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
          <div className="w-full px-3 lg:w-1/4">
            <h1 className="mb-2 font-semibold text-xl">
              Confirm Your Password
            </h1>
            <div className="flex items-center">
              <input
                type={isShow ? "password" : "text"}
                required
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className="input input-bordered input-primary w-full"
              />
              <span className="-ml-8" onClick={handleShowPassword}>
                {isShow ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <label className="label">
            <Link to={'/signin'}>
              <p className="label-text-alt">
                Already have an Account?{" "}
                <span className="text-sky-500 hover:underline">Sign In</span>
              </p>
            </Link>
          </label>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-info"
              />{" "}
              <p className="ml-2 label-text">
                {" "}
                Accept{" "}
                <span className="text-sky-500">Terms and Conditions</span>
              </p>
            </label>
          </div>
          <button className="btn btn-info bg-gradient-to-r from-cyan-500 to-blue-500 w-full mx-3 lg:w-1/4">
            Submit
          </button>
        </div>
      </form>
      <div className="flex justify-center my-10 px-3 lg:ml-16">
        <ul className="list-disc font-semibold text-lg bg-opacity-30 rounded-lg bg-rose-200 pl-8 py-5 px-5">
          <li>Requires at least one uppercase letter (A-Z) in the password.</li>
          <li>Requires at least one lowercase letter (a-z) in the password.</li>
          <li>Requires at least one digit (0-9) in the password.</li>
          <li>
            Requires at least one special character from the set [@#$%^&+=!] in
            the password.
          </li>
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={10000}
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

export default SignUp;
