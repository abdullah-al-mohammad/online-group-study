import { Link, useLoaderData } from "react-router";
import Heading from "../../../Components/Heading/Heading";
import { Helmet } from "react-helmet";

const AssignmentDetails = () => {
  const { title, difficulty, marks, description, image, date } = useLoaderData();
  return (
    <div>
      <Helmet>
        <title>assignment- details</title>
      </Helmet>
      <Heading heading={'Assignment Details'} subHeading={'What skills or knowledge will be demonstrated'}></Heading>
      {/* Add your assignment details content here */}
      <div className="card bg-base-100 shadow-sm">
        <figure>
          {image ? <img
            src={image}
            alt="Shoes"
          /> : 'image is undefind'}
        </figure>
        <div className="card-body bg-gray-500">
          <h2 className="card-title">Assignment Title:-{title}</h2>
          <p>
            {description}
          </p>
          <p>
            Assignment Mark:-<span className="text-red-500">{marks}</span>
          </p>
          <p>
            Complexity:- <span className="text-red-500">{difficulty}</span>
          </p>
          <p>
            Date:- <span className="text-red-500">{date}</span>
          </p>
          <div className="card-actions justify-end">
            <Link to={'/assignmentSubmission'}>
              <button className="btn btn-primary">Take Assignment</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
