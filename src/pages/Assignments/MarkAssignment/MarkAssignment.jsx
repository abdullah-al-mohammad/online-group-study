import React from "react";
import useAssignment from "../../../Hooks/useAssignment";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MarkAssignment = () => {
  const [assignmentMark] = useAssignment();
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data, id, status) => {
    console.log(data);

    const markInfo = {
      marks: data.mark,
      feedback: data.feedback,
      status: "completed"
    }
    axiosPublic.patch(`/assignment/${id}?type=marking`, markInfo)
      .then(res => {
        if (res.data.modifiedCount > 0 || res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Submited Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  return (
    <div>
      <Helmet>
        <title>assignment-mark</title>
      </Helmet>
      {assignmentMark.map((mark) => {
        if (mark.status === "pending") {
          return (
            <div className="hero">
              <div className="">
                <div className="text-center">
                  <p className="py-6">
                    Assignment-mark: {mark.pdfLink}
                  </p>
                  <p className="py-6">
                    Note: {mark.note}
                  </p>
                </div>
                <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                  <form onSubmit={handleSubmit((data) => onSubmit(data, mark._id, mark.status))} className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Assignment Mark</span>
                      </label>
                      <input type="number" placeholder="give mark"{...register('marks')} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Assignment Feedback</span>
                      </label>
                      <input type="text" placeholder="give your feedback" {...register('feedback')} className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary">Giving Mark</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MarkAssignment;

