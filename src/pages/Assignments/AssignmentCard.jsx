import { ImBin } from "react-icons/im";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePreview } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import { Link } from "react-router";

const AssignmentCard = ({ assignment, refetch }) => {
  const { title, image, marks, difficulty, _id, status, feedBack, note } = assignment;
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleDelete = async () => {
    // if user have the same email as the assignment email then delete the assignment
    if (user?.email !== assignment.email) {
      return Swal.fire({
        icon: "error",
        title: "You don't have permission to delete this assignment",
        text: "You can't delete this assignment",
      });
    }
    // confirm the delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/assignment/${assignment._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      {status === 'pending' ? '' : <div className="card bg-base-100 w-96 h-96 shadow-xl">
        {image && <figure>
          <img src={image} alt="image" />
        </figure>}
        <div className="card-body">
          {title && <h2 className="card-title">{title}</h2>}
          {marks ? <p className="text-gray-400">
            Mark: <span className="text-success">{marks}</span>
          </p> : <p className="text-gray-400">
            Note: <span className="text-success">{note}</span>
          </p>}
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
            <Link to={`/updateAssignment/${assignment._id}`}>
              <button className="btn btn-success tooltip" data-tip="Update">
                <RxUpdate />
              </button>
            </Link>
            <Link to={`/assignmentDetails/${_id}`}>
              <button className="btn btn-primary tooltip" data-tip="View">
                <MdOutlinePreview />
              </button>
            </Link>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default AssignmentCard;
