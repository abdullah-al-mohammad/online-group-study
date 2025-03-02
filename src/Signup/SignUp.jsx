import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const { signUpUser, updateUserProfile } = useAuth()
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = data => {
    signUpUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser);
        // update user profile
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  reset()
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Signup successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              })
            navigate('/')
          })
      }).catch(error => {
        console.log(error);

      })
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" {...register('name', { required: true })} className="input input-bordered" required />
              {errors.name && <span className="text-red-500">Name is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input type="url" placeholder="PhotoURL" {...register('photoURL', { required: true })} className="input input-bordered" required />
              {errors.photoURL && <span className="text-red-500"> photoURL is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" {...register('email', { required: true })} className="input input-bordered" required />
              {errors.email && <span className="text-red-500">Email Address is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" {...register('password', { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[a-zA-Z\d@#$%^&*]+$/ })} className="input input-bordered" required />
              {errors.password?.type === 'required' && <span className="text-red-500">password is required</span>}
              {errors.password?.type === 'minLength' && <span className="text-red-500">password must be 6 characters</span>}
              {errors.password?.type === 'maxLength' && <span className="text-red-500">password must be less than 20 characters</span>}
              {errors.password?.type === 'pattern' && <span className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</span>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;