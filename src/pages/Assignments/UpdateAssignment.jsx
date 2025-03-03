
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router";

const UpdateAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic()
const {_id, title, marks, image, difficulty, date, description} = useLoaderData()
const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = async (data) => {
    const assignmentInfo = {
      title: data.title,
      date: data.date,
      marks: data.marks,
      image: data.img,
      difficulty: data.difficulty,
      description: data.description,
    }
    const res = await axiosPublic.patch(`/assignment/${_id}`, assignmentInfo)

    if (res.data.modifiedCount > 0 || res.data.success) {
      navigate('/assignment')
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Assignment Update Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Update a Assignment</h1>
      {/* Add your form or other components here */}
      <div>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="title" defaultValue={title} {...register('title')} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker className='input input-bordered w-full' defaultValue={date} selected={startDate} {...register('date')} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input type="number" placeholder="marks" {...register('marks')} defaultValue={marks} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail Image URL</span>
                </label>
                <input type="text" placeholder=" thumbnail Image URL" {...register('img')} defaultValue={image} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Assignment Difficulty</span>
                </label>
                <select className="select input input-bordered" {...register("difficulty")} defaultValue={difficulty}>
                  <option value={''} disabled >Assignment Difficulty</option>
                  <option value={'easy'}>easy</option>
                  <option value={'medium'}>medium</option>
                  <option value={'hard'}>hard</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="description"
                  className="textarea textarea-bordered textarea-xs w-full" {...register('description')} defaultValue={description}></textarea>
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