import React from 'react';
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';
import useAuth from "./../../../Hooks/useAuth";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const CreateAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const assignmentInfo = {
      title: data.title,
      date: data.date.toISOString().split("T")[0],
      marks: data.marks,
      image: data.img,
      difficulty: data.difficulty,
      description: data.description,
      email: user?.email
    }
    axiosPublic.post('/assignment?type=create', assignmentInfo)
      .then(res => {
        reset()
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Submited Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };
  return (
    <div>
      <h1 className='text-3xl text-center' style={{backgroundImage: url('../')}}>Create a New Assignment</h1>
      {/* Add your form or other components here */}
      <div>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
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
              <button className="btn btn-primary">Create Assignment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;