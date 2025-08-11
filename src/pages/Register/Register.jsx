import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../../api/imgApi";
import axios from "axios";
import { DiAptana } from "react-icons/di";
import bgPhoto from "../../assets/logInPic/backgroundCover.jpg";
import { motion } from "motion/react";
import RegisterPhoto from "../../assets/RegisterLottie.jpeg";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setBtnClicked(true);
    setErrorMessage("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const displayName = form.name.value;
    const buyerPhoneNo = form.userPhoneNo.value;
    const image = form.image.files[0];
    const userType = form.userType.value;
    let photoURL;
    // console.log(userType);
    try {
      photoURL = await imageUpload(image);
      // console.log("Uploaded photoURL");
    } catch {
      setErrorMessage("Please upload photo to continue the registration");
      setBtnClicked(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be atleast 6 character or more");
      setBtnClicked(false);
      return;
    }
    const passValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passValid.test(password)) {
      setErrorMessage(
        "Atleast one uppercase letter, one lowercase letter, one digit and minimum length will be 6 or more "
      );
      setBtnClicked(false);
      return;
    }

    // createUser with EmailAndPassword

    try {
      const result = await createUser(email, password);
      // const user = result.user;
      await updateUserProfile(displayName, photoURL);
      // save user in db
      await axios.post(`http://localhost:3000/users/${email}`, {
        displayName,
        photoURL,
        email,
        userType,
        buyerPhoneNo,
      });
      navigate("/");
      Swal.fire({
        title: "Registration Successful",
        text: "Logged In",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (err) {
      Swal.fire({
        title: "Failed to Register",
        text: "Already have an account",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    setBtnClicked(false);
    form.reset();
  };
  // Google Sign In

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
      <div className="flex flex-row card bg-none border-4 border-cyan-200 shadow-2xl h-550px mb-20 w-[80%] justify-center items-center text-black font-medium">
        <motion.img
          src={RegisterPhoto}
          className="w-[40%] h-[200px] object-contain bg-center bg-no-repeat rounded-3xl ml-4 hidden lg:flex"
          animate={{
            y: [30, 15, 30],
          }}
        />

        <form className="card-body w-[60%]" onSubmit={handleRegister}>
          <p className="text-center text-4xl mb-8">Register</p>
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
              required
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              name="email"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
              required
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Image:
            </label>
            <input
              type="file"
              className="file-input file-input-success w-full border-none h-[60px] text-xl"
              name="image"
              accept="image/*"
            />
          </div>
          <div>
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              User Type:
            </label>
            <select
              defaultValue="Choose the type"
              name="userType"
              className="select text-sm text-black md:text-2xl h-[60px] w-full"
            >
              <option>User</option>
              <option>DeliveryMen</option>
            </select>
          </div>
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
              required
            />
          </div>
          {errorMessage && <p className="text-red-300">{errorMessage}</p>}
          <div className="form-control flex flex-col">
            <label className="label mb-2 text-xl md:text-2xl font-bold text-black">
              Phone Number:
            </label>
            <input
              type="tel"
              pattern="[0-9]{11}"
              placeholder="Enter your Number (Format: 12345678901)"
              name="userPhoneNo"
              className="input input-bordered text-sm text-black md:text-2xl h-[60px] w-full"
            />
          </div>
          <div className="form-control mt-8">
            <button className="btn rounded-sm text-lg md:text-2xl h-[60px] w-full border-none shadow-none bg-gradient-to-r from-pink-400 to-pink-300 focus:outline-2  hover:bg-pink-500 text-black">
              {btnClicked ? <DiAptana className="animate-spin" /> : "Register"}
            </button>
          </div>

          <div className="text-pink-300 text-center text-sm md:text-xl">
            Already have an account? Go to <Link to="/log_in">Log In</Link>
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
      </div>
    </div>
  );
};

export default Register;
