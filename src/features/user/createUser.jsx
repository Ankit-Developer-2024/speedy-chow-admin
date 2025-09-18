import { ADD_USER } from "../../app/strings/appStrings";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"; 
import { Loader } from "../../app/components/loader" 
import toast, { Toaster } from 'react-hot-toast';
import { createUserAsync, loading } from "./userSlice";


export const CreateUser = () => {
    const dispatch = useDispatch()   
    const isLoading= useSelector(loading)

    const {
        register, 
        reset,
        handleSubmit, 
        formState: { errors },
    } = useForm();

 

    function onSubmit(data) { 
        dispatch(createUserAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        val.message?
        (() => toast.error(val.message))() : (() => toast.error("User not created"))();
      }
      })
    }
 

    return (
        <>
            {isLoading ?
                <div className="w-full flex flex-row items-center justify-center">
                    <Loader></Loader>
                </div>
                :

                <div className="px-5 py-3 w-full">
                    <Toaster />
                    <div className=" flex flex-row items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{ADD_USER}</h1>
                            <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p>
                        </div>
                    </div>
                    <br />

                    <div className="bg-white p-5 rounded-xl flex flex-row gap-3 w-[60%] items-start ">

                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <label className="text-xl font-medium block" >Name:</label>

                            <input
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Product Name" {...register("name", { required: "Name is required." })}
                            />
                            {errors.name?.message && <p className="text-md text-red-500">{errors.name.message}</p>}

                            {/* Email */}
                            <label className="text-xl font-medium block" >Email:</label>
                            <input
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Email" {...register("email", { required: "Email is required.", pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address"
                                } })}
                            />
                            {errors.email?.message && <p className="text-md text-red-500">{errors.email.message}</p>}

                            {/* Password */}
                            <label className="text-xl font-medium block" >Password:</label>
                            <input
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Password" {...register("password", { required: "Password is required.",
                                     pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                         message: 'At least 8 characters ,1 uppercase letter, 1 lowercase letter, 1 number and contain a special character',
                                }
                            })}
                            />
                            {errors.password?.message && <p className="text-md text-red-500">{errors.password.message}</p>}

                           
                            <input className="bg-orange-400 mt-2 py-2 px-5 rounded-md font-medium text-white hover:bg-amber-500" type="submit" value="Create" />
                            <button className="bg-yellow-400 mt-2 py-2 px-5 rounded-md font-medium text-white hover:bg-yellow-500 ml-3" onClick={()=>reset()}  >Reset</button>

                        </form> 

                    </div>


                </div>
            }

        </>
    );
}