import { MdSearch } from "react-icons/md";
import backgroundImg from "../../../assets/bg.png";
const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "400px",
      }}
    >
      <MdSearch />
      <p>THis is banner section</p>
    </div>
  );
};

export default Banner;
