import { FaRocket } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Card from "../../SharedSections/CardDesign/Card";
import { BsBoxFill } from "react-icons/bs";

const Features = () => {
  const coreFeatures = [
    {
      title: "Super Fast Delivery",
      icon: <FaRocket size={20} />,
      description:
        "We will deliver the parcel as early as possible. Most of the time we try to give the parcel to our customer before their delivery date comes.",
    },
    {
      title: "Guaranteed Parcel Safety",
      icon: <BsBoxFill size={20} />,
      description:
        "We handle every package with care and provide secure, tamper-proof packaging to ensure safe delivery.",
    },
    {
      title: "24/7 Customer Support",
      icon: <FaPhoneAlt size={20} />,
      description:
        "Need help? Our dedicated support team is available anytime to assist you.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto pt-10">
      {coreFeatures.map((feature, index) => (
        <Card key={index} feature={feature}></Card>
      ))}
    </div>
  );
};

export default Features;
