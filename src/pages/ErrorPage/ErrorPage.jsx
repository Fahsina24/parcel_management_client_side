import { Link } from "react-router-dom";
import Navbar from "../SharedSections/Navbar/Navbar";
import Footer from "../SharedSections/Footer/Footer";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center">
        <div className="text-center mt-14 mb-14">
          <h1 className="text-4xl pb-4 font-extrabold text-red-500">404</h1>
          <p className="text-xl pb-4 font-bold">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="btn bg-gradient-to-r from-blue-500 to-blue-700 btn-lg text-white rounded-md  hover:bg-blue-700 m-4"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
