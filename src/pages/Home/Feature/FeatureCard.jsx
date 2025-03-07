import { FaUsers, FaClock, FaShareAlt, FaGamepad, FaDoorOpen, FaRobot } from "react-icons/fa";

// Map string names from JSON to actual React Icons
const iconMap = {
    "FaUsers": <FaUsers></FaUsers>,
    "FaClock": <FaClock></FaClock>,
    "FaShareAlt": <FaShareAlt></FaShareAlt>,
    "FaGamepad": <FaGamepad></FaGamepad>,
    "FaDoorOpen": <FaDoorOpen></FaDoorOpen>,
    "FaRobot": <FaRobot></FaRobot>
  };

const FeatureCard = ({ featureData }) => {
  const { title, description, icon, image} = featureData
  // Get the correct icon component
  const IconComponent = iconMap[icon];

  return (
    <div>
      <div className="card bg-base-100 w-96 h-96 shadow-xl">
        <figure>
          <img
            src={image}
            alt="image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}!</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            {IconComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
