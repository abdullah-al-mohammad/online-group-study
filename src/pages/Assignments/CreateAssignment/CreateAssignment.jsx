import React from 'react';
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';

const CreateAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Create a New Assignment</h1>
      {/* Add your form or other components here */}
      <div className="hero-content">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className='grid grid-cols-1 md:grid-cols-2 place-items-center gap-5'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="title" {...register('title')} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker className='input input-bordered' selected={startDate} {...register('date')} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input type="number" placeholder="marks" {...register('marks')} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail Image URL</span>
                </label>
                <input type="text" placeholder=" thumbnail Image URL" {...register('img')} className="input input-bordered" required />
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
                  className="textarea textarea-bordered textarea-xs w-full max-w-xs" {...register('description')}></textarea>
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

export default CreateAssignment;