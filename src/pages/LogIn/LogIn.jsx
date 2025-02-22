import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { DiAptana } from "react-icons/di";

import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);

  const handleLogIn = async (e) => {
    setBtnClicked(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInUser(email, password);
      navigate("/");
      Swal.fire({
        title: "Success",
        text: "Sign is successful",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (err) {
      Swal.fire({
        title: "Failed to Log In",
        text: "Please use correct credentials",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    setBtnClicked(false);
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    const { displayName, photoURL, email } = result.user;
    await axios.post(`http://localhost:3000/users/${email}`, {
      displayName,
      photoURL,
      email,
    });
    Swal.fire({
      title: "Success",
      text: "Successfully Logged In",
      icon: "success",
      confirmButtonText: "Cool",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 min-h-screen">
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl h-550px mb-20">
        <form className="card-body" onSubmit={handleLogIn}>
          <p className="text-center text-4xl">Login</p>
          <div className="divider"></div>
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text text-2xl font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="input input-bordered text-2xl h-[60px]"
              required
              name="email"
            />
          </div>
          <div className="form-control ">
            <label className="label ">
              <span className="label-text text-2xl font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered h-[60px] text-2xl"
              required
              name="password"
            />
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary rounded-full text-2xl h-[60px]">
              {btnClicked ? <DiAptana className="animate-spin" /> : "LogIn"}
            </button>
          </div>
          <div className="divider">or Log in with</div>
          <div className="form-control mt-4">
            <button
              className="btn text-2xl h-[60px] rounded-full hover:bg-[#564CFC] hover:text-white"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> Log in with Google
            </button>
          </div>

          <p className="text-center mt-4 mb-8 text-lg">
            Don't have an account?
            <Link
              to="/register"
              className="label-text-alt link link-hover text-blue-700 text-lg ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
