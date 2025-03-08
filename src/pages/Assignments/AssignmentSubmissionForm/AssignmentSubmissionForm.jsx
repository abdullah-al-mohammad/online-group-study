import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import useAuth from "./../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
const AssignmentSubmissionForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const assignmentSubmit = {
      pdfLink: data.pdfLink,
      submittedAt: data.date.toISOString().split("T")[0],
      email: user?.email,
      note: data.note,
      title: data.title,
      marks: data.marks,
      name: user?.displayName
    };
    axiosSecure.post("/assignment?type=submit", assignmentSubmit).then((res) => {
      reset();
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Assignment Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/pending')
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Assignment Submission Form</h1>
      <div>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> PDF/doc link</span>
                </label>
                <input
                  type="text"
                  placeholder=" PDF/doc link"
                  {...register("pdfLink")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="title" {...register('title')} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input type="number" placeholder="marks" {...register('marks')} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()} // Default to today's date
                  render={({ field }) => (
                    <DatePicker
                      className="input input-bordered"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Note</span>
                </label>
                <textarea
                  placeholder="Note"
                  className="textarea textarea-bordered textarea-xs w-full h-10"
                  {...register("note")}
                ></textarea>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit Assignment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionForm;
