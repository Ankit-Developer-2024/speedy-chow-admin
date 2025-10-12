import { useEffect, useState } from "react";
import { PageHeading } from "../../app/components/pageHeading";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAsync, data, deleteCategoryAsync, fetchCategoryAsync, loading } from "./categorySlice";
import { Loader } from "../../app/components/loader";
import { MdDeleteOutline } from "react-icons/md";
import burger from '../../assets/burger.jpeg'
import { POPModal } from "../../app/components/popModel";
import { CONFIRMATION } from "../../app/strings/appStrings";
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast'; 

export default function Category() {
    const dispatch = useDispatch()
    const categories = useSelector(data)
    const isLoading = useSelector(loading)
    let [isModalopen, setIsModalopen] = useState(false)
    let [deleteCategoryId, setDeleteCategoryId] = useState(null)
    let [preview, setPreview] = useState("")

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        let categoryDetails = {
            name: data.name
        }

        const formData = new FormData();
        formData.append("categoryDetails", JSON.stringify(categoryDetails))
         const image = watch('image'); 
        if(image[0]){ 
            formData.append('image', image[0]);
        }

        dispatch(createCategoryAsync(formData)).unwrap().then((val) => {
                if (val.success) {
                    (() => toast.success(val.message))();
                } else {
                    (() => toast.error(val.message))();
                }
            })
    }

    function handleImage(e) {
          const image = watch('image'); 
        if (image[0]) {
            const imagePreview = image ? URL.createObjectURL(image[0]) : null;
            setPreview(imagePreview)
        }
    }



    function handleCategoryDeleteion() {
        setIsModalopen(false)
        setDeleteCategoryId(null)
        dispatch(deleteCategoryAsync(deleteCategoryId)).unwrap().then((val) => {
            if (val.success) {
                (() => toast.success(val.message))();
            } else {
                (() => toast.error(val.message))();
            }
        })
    }

    function handleDeletePop(id) {
        if (id !== -1) {
            setIsModalopen(true)
            setDeleteCategoryId(id)
        }
    }



    useEffect(() => {
        dispatch(fetchCategoryAsync()).unwrap().then((val) => {
            if (val.success) {
                (() => toast.success(val.message))();
            } else {
                (() => toast.error(val.message))();
            }
        })
    }, [dispatch])
    console.log(categories);

    return (
        <>
            <div className="w-full px-5 py-3 relative">
                <PageHeading pageName={"Category"}></PageHeading>
                <a href="#addCategory"          
                    className="bg-orange-400 p-2 my-2 inline-block rounded-md font-medium text-white hover:bg-amber-500 cursor-pointer"
                  >Add Category</a>
                <Toaster />
                <br />
                {isLoading ?
                    <Loader></Loader>
                    : <div className="flex flex-wrap justify-start gap-5">
                        {categories.length === 0 && isLoading === false ? <p className="text-xl font-bold text-center m-auto">No Categort found!</p> :

                            categories.map((category) => {
                                return <div key={category.id} className="bg-white rounded-xl p-3 w-[200px] relative">
                                    {isModalopen && (
                                        <POPModal onClose={() => setIsModalopen(false)} onOk={() => handleCategoryDeleteion()}>
                                            <div className="w-full">
                                                <h2 className="text-2xl font-bold text-center">{CONFIRMATION}</h2>
                                                <p className="text-xl font-medium ">Are you sure you want to permanent delete Category ({deleteCategoryId}) from database?</p>
                                            </div>
                                        </POPModal>
                                    )}
                                    <div className="absolute right-5 cursor-pointer">
                                        <MdDeleteOutline onClick={() => handleDeletePop(category.id)} className="h-9 w-9 p-1 rounded-sm bg-gray-200 text-red-500 hover:bg-red-200 " />
                                    </div>

                                    <img className="w-full h-[150px] rounded-xl" src={category.image} alt="category" loading="lazy" />
                                    <h1 className="font-medium mt-0.5">{category.name}</h1>
                                </div>
                            })
                        }
                    </div>
                }
                <br />
                <div id="addCategory" >
                <h1 className="text-2xl font-bold">Add Category</h1>
                <br />

                <div className="flex flex-row gap-3 items-start justify-start  ">
                    <div className="w-[200px] h-[152px] border border-dashed border-gray-400 rounded-xl  relative">
                        {preview ? <img className="absolute top-0 rounded-sm w-full h-full" src={preview} alt="product image" />
                            : <div className="text-sm font-medium absolute top-[45%] left-[27%] ">
                                <p>Select image</p>
                            </div>}
                        <input className="w-[200px] h-[150px] absolute top-0 opacity-0 cursor-pointer"
                            type="file"
                            {...register("image", {
                                onChange: (e) => handleImage(e),
                                required: "Image is required.",
                                validate: {
                                    acceptedFormats: (files) => {
                                        return files && files.length > 0 && ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || "Only JPEG, PNG, JPG are allowed."
                                    }
                                },
                            })}
                        />
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-xl font-medium" >Category Name:</label>
                        <input
                            className="bg-gray-50 w-full text-xl border rounded-sm  px-1.5 focus:outline-none focus:border-orange-400"
                            placeholder="Category Name" {...register("name", { required: "Name is required." })}
                        />
                        {errors.name?.message && <p className="text-[15px] text-red-500 inline">{errors.name.message}</p>}


                        <input className="bg-orange-400 py-2 my-1 px-5 rounded-md font-medium text-white hover:bg-amber-500 cursor-pointer" type="submit" value="Create" />
                        <button className="bg-yellow-400 py-2 px-5 rounded-md font-medium text-white hover:bg-yellow-500 cursor-pointer" onClick={() => reset()}  >Reset</button>

                    </form>
                </div>
                </div>



            </div>

        </>
    )
}