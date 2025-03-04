import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import useAuth from "./../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const AssignmentSubmissionForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const assignmentSubmit = {
      pdfLink: data.pdfLink,
      submittedAt:  data.date.toISOString().split("T")[0], //
      email: user?.email,
      note: data.note,
    };
    axiosSecure.post("/submit", assignmentSubmit).then((res) => {
      reset();
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Assignment Submited Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Assignmnet Submission Form</h1>
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
                  <span className="label-text">Note</span>
                </label>
                <textarea
                  placeholder="Note"
                  className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                  {...register("note")}
                ></textarea>
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
