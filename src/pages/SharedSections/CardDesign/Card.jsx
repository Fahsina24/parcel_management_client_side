const Card = ({ feature }) => {
  return (
    <div className="card bg-white rounded-xl shadow-md p-4 max-w-md mx-auto border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="card-body">
        <div className="flex gap-2 size-fit mx-auto justify-center items-center">
          <p className="card-title">{feature.icon}</p>
          <h2 className="card-title text-2xl text-[#2563EB]font-extrabold">
            {feature.title}
          </h2>
        </div>
        <p className="w-full  mx-auto text-lg">{feature.description}</p>
      </div>
    </div>
  );
};

export default Card;
