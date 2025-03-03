
import { ImBin } from "react-icons/im";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePreview } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import { Link } from "react-router";

const AssignmentCard = ({ assignment }) => {
  const { title, image, marks, difficulty, _id } = assignment;
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  console.log(assignment.email);

  const handleDelete = async () => {
    // if user have the same email as the assignment email then delete the assignment
    if (user?.email !== assignment.email) {
      return Swal.fire({
        icon: "error",
        title: "You don't have permission to delete this assignment",
        text: "You can't delete this assignment"
      })
    }
    // confirm the delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/assignment/${assignment._id}`)
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }
    });

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
            onClick={() => handleDelete()}
            className="btn btn-error tooltip"
            data-tip="Delete"
          >
            <ImBin />
          </button>
          <Link to={`/updateAssignment/${assignment._id}`} className="btn btn-success tooltip" data-tip="Update">
            <RxUpdate />
          </Link>
          <button className="btn btn-primary tooltip" data-tip="View">
            <MdOutlinePreview />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
