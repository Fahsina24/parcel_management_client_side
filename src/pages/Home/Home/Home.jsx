import Banner from "../Banner/Banner";
import DeliveryCard from "../DeliveryCard/DeliveryCard";
import Features from "../Features/Features";
import Statistics from "../Statistics/Statistics";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div>Features Section</div>
      <Features></Features>
      <div>Statistics Section</div>
      <Statistics></Statistics>
      <div>Top Delivery Mens </div>
      <DeliveryCard></DeliveryCard>
    </div>
  );
};

export default Home;
