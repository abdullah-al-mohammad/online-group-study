
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import useAssignment from "../../Hooks/useAssignment";
import { useLoaderData } from "react-router";

const UpdateAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic()
  // const [assignments] = useAssignment()
  const { _id, title } = useLoaderData()
  console.log(_id, title);

  // filter id by map

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);
    const assignmentInfo = {
      title: data.title,
      date: data.date,
      marks: data.marks,
      image: data.img,
      difficulty: data.difficulty,
      description: data.description,
    }
    const res = axiosPublic.patch(`/assignment/${_id}`, assignmentInfo)

    if (res.data.modifiedCount > 0 || res.data.success) {
      reset()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment Submited Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Update a Assignment</h1>
      {/* Add your form or other components here */}
      <div className="">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="title" {...register('title')} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker className='input input-bordered w-full' selected={startDate} {...register('date')} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input type="number" placeholder="marks" {...register('marks')} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail Image URL</span>
                </label>
                <input type="text" placeholder=" thumbnail Image URL" {...register('img')} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Assignment Difficulty</span>
                </label>
                <select className="select input input-bordered" {...register("difficulty")}>
                  <option disabled selected>Assignment Difficulty</option>
                  <option>easy</option>
                  <option>medium</option>
                  <option>hard</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="description"
                  className="textarea textarea-bordered textarea-xs w-full" {...register('description')}></textarea>
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

export default UpdateAssignment;