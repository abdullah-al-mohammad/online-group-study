import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import './login.css'

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset(); // Reset form after successful login
      navigate(from, { replace: true })
    });
  };
  return (
    <div>
      <Helmet>
        <title>home || login</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="hero bg-login  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Your Account!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
          </div>
          <div className="card bg-form w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-red-500">Email Address is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[a-zA-Z\d@#$%^&*]+$/,
                  })}
                  className="input input-bordered w-full"
                  required
                />
                <p className="absolute right-3 bottom-3" onClick={()=> setShowPassword(!showPassword)}>
                  {
                    showPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </p>
                </div>
                {errors.password?.type === "required" && (
                  <span className="text-red-500">password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">
                    password must be less than 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number, and one special character.
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
              <p className="p-5">Don't  have an account please?<Link className="text-primary font-mono font-bold" to={'/signup'}>create account</Link></p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
