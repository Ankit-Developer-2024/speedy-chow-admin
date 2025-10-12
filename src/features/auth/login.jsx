import { LOGIN, SIGN_UP } from "../../app/strings/appStrings";
import burgerImg from "../../assets/burger.jpeg";
import pastryImg from "../../assets/pastry.jpg" 
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router";
import { loading, logInAsync } from "./authSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { LoaderPop } from "../../app/components/loaderPop";

export const LogIn = function () {

    const dispatch = useDispatch()
    const isLoading = useSelector(loading)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    function onSubmit(data) {
        dispatch(logInAsync(data)).unwrap().then((val) => {
            if (val.success) {
                (() => toast.success(val.message))()
                navigate('/')
            } else {
                (() => toast.error("Wrong credentials!"))()
            }
        })

    }
    return (
        <>
            <div className="bg-gray-100 w-svw h-svh flex items-center justify-center p-16">
                <Toaster />
                {isLoading && <LoaderPop></LoaderPop>}
                <div className="w-full h-[490px] flex flex-col items-start justify-center ">
                    <h1 className="text-3xl font-extrabold text-orange-500">Speedu Chow</h1>
                    <p className="text-md font-medium text-gray-500">Modern admin help</p>
                    <p className="text-md font-light text-gray-600">Managing products, users, and order statuses, alongside an efficient fuzzy search, can be improved by focusing on robust data structures, clear API design, and optimized search algorithms.</p>
                    <div className="flex flex-row items-center justify-start relative">
                         <img className="rounded-[100%]  object-cover w-[40%] h-[200px] mt-7" src={burgerImg} alt="images" />
                         <img className="rounded-[100%] absolute left-25  object-cover w-[40%]  h-[200px] mt-7" src={pastryImg} alt="images" />
                         <img className="rounded-[100%]   object-cover w-[40%]  h-[200px] mt-7" src={burgerImg} alt="images" />
                       
                       
                    </div>
                </div>
                <div className="bg-white h-[350px] p-5 w-full rounded-xl flex flex-col items-center justify-center ">
                    <h1 className="text-3xl font-bold mb-2 text-center">{LOGIN}</h1>

                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>


                        {/* Email */}
                        <label className="text-xl font-medium block" >Email:</label>
                        <input
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Email" {...register("email", {
                                required: "Email is required.", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email?.message && <p className="text-md text-red-500">{errors.email.message}</p>}

                        {/* Password */}
                        <label className="text-xl font-medium block" >Password:</label>
                        <input
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Password" {...register("password", { required: "Password is required.", })}
                        />
                        {errors.password?.message && <p className="text-md text-red-500">{errors.password.message}</p>}

                        <input className="bg-orange-400 mt-2 py-2 px-5 rounded-md font-medium text-white hover:bg-amber-500" type="submit" value={LOGIN} />
                        <span className="text-md  ml-3">Already have an ccount? <Link to='/signup' className="underline font-medium hover:text-orange-500">{SIGN_UP} </Link> </span>

                    </form>

                </div>

            </div>
        </>
    )
}