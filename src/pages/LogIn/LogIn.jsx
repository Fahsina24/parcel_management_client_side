import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bgPhoto from "../../assets/logInPic/backgroundCover.jpg";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { DiAptana } from "react-icons/di";
import LogInPhoto from "../../assets/logInPic/logIn.png";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const LogIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);

  const handleLogIn = async (e) => {
    setBtnClicked(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signInUser(email, password);
      Swal.fire({
        title: "Success",
        text: "Sign is successful",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Failed to Log In",
        text: "Please use correct credentials",
        icon: "error",
        confirmButtonText: "Close",
      });
      setBtnClicked(false);
      form.reset();
    }
  };

  const handleGoogleSignIn = async () => {
    const userType = "User";
    const result = await signInWithGoogle();
    const { displayName, photoURL, email } = result.user;
    await axios.post(`http://localhost:3000/users/${email}`, {
      displayName,
      photoURL,
      email,
      userType,
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
    <div
      className="flex flex-col pt-30 items-center justify-center bg-cover bg-center opacity-90"
      style={{
        backgroundImage: `url(${bgPhoto})`,
      }}
    >
      <div className=" flex flex-row card bg-none border-4 border-cyan-200  shadow-2xl h-550px mb-20 w-[80%] justify-center items-center text-black font-medium ">
        <form className="card-body w-[80%]" onSubmit={handleLogIn}>
          <p className="text-center text-4xl mb-8">Login</p>

          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
              required
              name="email"
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
              required
              name="password"
            />
          </div>
          <div className="form-control mt-4">
            <button className="btn rounded-sm text-lg md:text-2xl h-[60px] w-full border-none shadow-none bg-gradient-to-r from-pink-400 to-pink-300 focus:outline-2  hover:bg-pink-500 text-black ">
              {btnClicked ? <DiAptana className="animate-spin" /> : "LogIn"}
            </button>
          </div>
          <div className="text-pink-300 text-center text-sm md:text-xl">
            Don't have an account? Go to <Link to="/register">Sign Up</Link>
          </div>
          <p className="text-lg text-center"> or log in with </p>

          <button
            className="btn text-sm md:text-2xl h-[60px] rounded-sm text-center  hover:bg-pink-400 hover:text-white border-none focus:outline-2 shadow-none"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="rounded-full w-fit bg-white" /> Register with
            Google
          </button>

          <Link className="text-lg text-center" to="/">
            Back to <span className="text-pink-300 ">Home</span>
          </Link>
        </form>
        <motion.img
          src={LogInPhoto}
          className="w-[60%] h-[300px] object-contain bg-center bg-no-repeat rounded-3xl mr-4 hidden lg:flex"
          animate={{
            y: [30, 15, 30],
          }}
        />
      </div>
    </div>
  );
};

export default LogIn;
