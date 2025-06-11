import { MdSearch } from "react-icons/md";
import Lottie from "lottie-react";
import bannerCover from "../../../assets/homePic/bannerCover.jpg";
import bannerLottie from "../../../assets/homePic/bannerPageLottie.json";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <section
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center opacity-90"
      style={{
        backgroundImage: `url(${bannerCover})`,
      }}
    >
      <div className="relative z-10 max-w-6xl w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white md:w-10/12 space-y-5 ">
          <motion.h2
            animate={{
              x: [20, 0],
              transition: {
                ease: ["easeIn", "easeOut"],
                repeat: Infinity,

                repeatDelay: 1,
              },
            }}
            className="text-2xl md:text-4xl font-bold"
          >
            Bringing You the Best — Faster, Smarter, Easier!
          </motion.h2>
          <p className="text-lg text-gray-200 animate-bounce">
            Ideal for online retail or delivery services.
          </p>
          <div className="flex items-center w-full bg-white rounded-md  ">
            <p className="p-3 text-gray-600">
              <MdSearch size={22} />
            </p>
            <input
              type="search"
              placeholder="Enter your post code to get your product delivered"
              className=" w-fit px-2 py-2 focus:outline-none text-gray-800 md:h-20 h-10 lg:h-30 text-sm lg:text-xl  "
            />
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <Lottie
            animationData={bannerLottie}
            loop={true}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
