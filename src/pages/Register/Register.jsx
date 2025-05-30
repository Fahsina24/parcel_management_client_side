import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../../api/imgApi";
import axios from "axios";
import { DiAptana } from "react-icons/di";

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
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.name.value;
    const image = e.target.image.files[0];
    let photoURL;
    // console.log(email, password, displayName, photoURL);
    try {
      photoURL = await imageUpload(image);
      console.log("Uploaded photoURL");
    } catch {
      setErrorMessage("Please upload photo to continue the registration");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be atleast 6 character or more");
      return;
    }
    const passValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passValid.test(password)) {
      setErrorMessage(
        "Atleast one uppercase letter, one lowercase letter, one digit and minimum length will be 6 or more "
      );
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
  };
  // Google Sign In

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
        <form className="card-body" onSubmit={handleRegister}>
          <p className="text-center text-4xl">Register</p>
          <p className="text-center text-xl text-blue-600 mt-4">
            Register Now to continue
          </p>
          <div className="divider"></div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text text-2xl font-bold ">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered text-2xl h-[60px]"
              required
            />
          </div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text text-2xl font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              name="email"
              className="input input-bordered text-2xl h-[60px]"
              required
            />
          </div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text text-2xl font-bold">Image:</span>
            </label>

            <input
              type="file"
              className="file-input file-input-success"
              name="image"
              accept="image/*"
            />
          </div>
          <div className="form-control ">
            <label className="label ">
              <span className="label-text text-2xl font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              className="input input-bordered h-[60px] text-2xl"
              required
            />
          </div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          <div className="form-control mt-8">
            <button className="btn btn-primary rounded-full text-2xl h-[60px]">
              {btnClicked ? <DiAptana className="animate-spin" /> : "Register"}
            </button>
          </div>

          <div className="divider">or Register with</div>
          <div className="form-control mt-4">
            <button
              className="btn text-2xl h-[60px] rounded-full hover:bg-[#564CFC] hover:text-white"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> Register with Google
            </button>
          </div>
        </form>

        <p className="text-center mb-8 text-lg">
          Already have an account?
          <Link
            to="/log_in"
            className="label-text-alt link link-hover text-blue-700 text-lg ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
