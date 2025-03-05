import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import useAuth from '../../../Hooks/useAuth';
import { MdOutlinePreview } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { ImBin } from 'react-icons/im';
import { Link } from "react-router";
import Swal from 'sweetalert2';

const MyAssignment = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const { data: assignments = [], refetch } = useQuery({
    queryKey: ['assignment', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/assignment/my?email=${user?.email}`)
      console.log(response);

      return response.data
    }
  });
  console.log(assignments);

  const handleDelete = async () => {
    // if user have the same email as the assignment email then delete the assignment
    // if (user?.email !== assignment.email) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "You don't have permission to delete this assignment",
    //     text: "You can't delete this assignment",
    //   });
    // }
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
        const res = await axiosSecure.delete(`/assignment/${data._id}`);
        if (res.data.deletedCount > 0) {
          refetch()
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
      <h1>My Assignment</h1>
      {
        assignments.map(data => {
          return (
            <div className="card bg-base-100 w-96 h-96 shadow-xl">
              <figure>
                <img src={data.image} alt="image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p className="text-gray-400">
                  Mark: <span className="text-success">{data.marks}</span>
                </p>
                <p className="text-gray-400">
                  Tasks: <span className="text-red-500">{data.difficulty}</span>
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-error tooltip"
                    data-tip="Delete"
                  >
                    <ImBin />
                  </button>
                  <Link
                    to={`/updateAssignment/${data._id}`}>
                    <button
                      className="btn btn-success tooltip"
                      data-tip="Update"
                    >
                      <RxUpdate />
                    </button>
                  </Link>
                  <Link to={`/assignmentDetails/${data._id}`}>
                    <button className="btn btn-primary tooltip" data-tip="View">
                      <MdOutlinePreview />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default MyAssignment;