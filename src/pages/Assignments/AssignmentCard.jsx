import React from "react";
import { ImBin } from "react-icons/im";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePreview } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";

const AssignmentCard = ({ assignment }) => {
  const { title, image, marks, difficulty, _id } = assignment;
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleDelete = async () => {
    console.log("user deleted");
    axiosPublic.delete(`/assignment/${assignment._id}`)
    .then(res => {
      if(res.data.deletedCount > 0){
        alert('deleted successfully')
      }
    })
  };
  return (
    <div className="card bg-base-100 w-96 h-96 shadow-xl">
      <figure>
        <img src={image} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p className="text-gray-400">
          Mark: <span className="text-success">{marks}</span>
        </p>
        <p className="text-gray-400">
          Tasks: <span className="text-red-500">{difficulty}</span>
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={handleDelete}
            className="btn btn-error tooltip"
            data-tip="Delete"
          >
            <ImBin />
          </button>
          <button className="btn btn-success tooltip" data-tip="Update">
            <RxUpdate />
          </button>
          <button className="btn btn-primary tooltip" data-tip="View">
            <MdOutlinePreview />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
