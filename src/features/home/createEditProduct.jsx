import { useEffect, useRef, useState } from "react";
import { ADD_PRODUCT, EDIT_PRODUCT } from "../../app/strings/appStrings";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { category, createProductAsync, message, fetchCategoryAsync, loading, updateProductAsync } from "./homeSlice";
import { Loader } from "../../app/components/loader"
import { useLocation } from "react-router";
import toast, { Toaster } from 'react-hot-toast'; 


export const CreateEditProduct = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const fileImageRef = useRef(null);
    const [preview, setPreview] = useState("");
    const categories = useSelector(category)
    const isLoading = useSelector(loading)
    let msg = useSelector(message)
    let [pageTitle, setPageTitle] = useState(ADD_PRODUCT)


    const {
        register,
        setValue,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    function handleImage(e) {
        const image = watch('image'); 
        if (image[0]) {
            const imagePreview = image ? URL.createObjectURL(image[0]) : null;
            setPreview(imagePreview)
        }
    }

    function onSubmit(data) {
        let productDetails = {
            name: data.name,
            description: data.description,
            price: data.price,
            totalQuantity: data.totalQuantity,
            category: data.category
        }
        if (data.discountPercentage !== "") {
            productDetails['discountPercentage'] = data.discountPercentage
        }
        if (data.rating !== "") {
            productDetails["rating"] = data.rating
        }
        if (data.deleted !== "") {
            productDetails.deleted = data.deleted
        }

        const formData = new FormData();
        formData.append("productDetails", JSON.stringify(productDetails))
        if(fileImageRef.current.files[0]){ 
            formData.append('image', fileImageRef.current.files[0]);
        }

        if (pageTitle === ADD_PRODUCT) { 
            dispatch(createProductAsync(formData)).unwrap().then((val) => {
                if (val.success) {
                    (() => toast.success(val.message))();
                } else {
                    (() => toast.error(val.message))();
                }
            })
        } else {
            const { product } = location.state || {}
            dispatch(updateProductAsync({ formData, id: product.id })).unwrap().then((val) => {
                if (val.success) {
                    (() => toast.success(val.message))();
                } else {
                    (() => toast.error(val.message))();
                }
            })
        }

    }

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategoryAsync())
        }

        if (location.pathname == "/edit-product") {
            setPageTitle(EDIT_PRODUCT)
            const { product } = location.state || {}
            setValue('name', product.name)
            setValue('description', product.description)
            setValue('price', product.price)
            setValue('discountPercentage', product.discountPercentage)
            setValue('totalQuantity', product.totalQuantity)
            setValue('rating', product.rating)
            setValue('category', product.category)
            setValue('deleted', product.deleted)
            setPreview(product.image);

            // if (location.pathname == "/edit-product") {
            //     const { product } = location.state || {}
            //     const buffer = new Uint8Array(product.image.data);
            //     // Convert to File 
            //     let type = product.imageType.split('/')[1]
            //     const file = new File(
            //         [buffer],               // data
            //         `download.${type}`,        // file name
            //         { type: product.imageType, lastModified: Date.now() }
            //     );
            //     const dataTransfer = new DataTransfer();
            //     dataTransfer.items.add(file);
            //     if (fileImageRef.current) {
            //         fileImageRef.current.files = dataTransfer.files;
            //     }
            // }
        }

    }, [dispatch])


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
                            <h1 className="text-3xl font-bold">{pageTitle}</h1>
                            <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p>
                        </div>
                    </div>
                    <br />

                    <div className="bg-white p-5 rounded-xl flex flex-row gap-3 w-full items-start justify-between">

                        <form className="w-[65%]" onSubmit={handleSubmit(onSubmit)}>
                            <label className="text-xl font-medium block" >Name:</label>

                            <input
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Product Name" {...register("name", { required: "Name is required." })}
                            />
                            {errors.name?.message && <p className="text-md text-red-500">{errors.name.message}</p>}

                            {/* Description */}
                            <label className="text-xl font-medium block" >Description:</label>
                            <textarea
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                cols="10"
                                rows="4"
                                placeholder="Description" {...register("description", { required: "Description is required." })}
                            />
                            {errors.description?.message && <p className="text-md text-red-500">{errors.description.message}</p>}

                            {/* price */}
                            <label className="text-xl font-medium block">Price:</label>
                            <input
                                type="number"
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Price" {...register("price", { required: "Price is required.", minLength: { value: 1, message: "Minimum price is 1" } })}
                            />
                            {errors.price?.message && <p className="text-md text-red-500">{errors.price.message}</p>}

                            {/* Discount Percentage */}
                            <label className="text-xl font-medium block">Discount Percentage(%):</label>
                            <input
                                type="number"
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Discount percentage" {...register("discountPercentage", { min: { value: 0, message: "Minimum Discount Percentage is 0" }, max: { value: 100, message: "Maximum Discount Percentage is 100" } })}
                            />
                            {errors.discountPercentage?.message && <p className="text-md text-red-500">{errors.discountPercentage.message}</p>}

                            {/* totalQuantity */}
                            <label className="text-xl font-medium block">Total Quantity:</label>
                            <input
                                type="number"
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Total quantity" {...register("totalQuantity", { required: "Total quantity required.", minLength: { value: 0, message: "Minimum quantity is 0" } })}
                            />
                            {errors.totalQuantity?.message && <p className="text-md text-red-500">{errors.totalQuantity.message}</p>}

                            {/* Rating */}
                            <label className="text-xl font-medium block">Rating:</label>
                            <input
                                type="number"
                                className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                                placeholder="Rating" {...register("rating", { minLength: { value: 0, message: "Minimum rating is 0" }, maxLength: 5 })}
                            />
                            {errors.rating?.message && <p className="text-md text-red-500">{errors.rating.message}</p>}

                            <input className="bg-orange-400 py-2 px-5 rounded-md font-medium text-white hover:bg-amber-500 cursor-pointer" type="submit" value={pageTitle === ADD_PRODUCT ? "Create" : "Edit"} />
                            <button className="bg-yellow-400 py-2 px-5 rounded-md font-medium text-white hover:bg-yellow-500 ml-3 cursor-pointer" onClick={()=>reset()}  >Reset</button>

                        </form>



                        <div>
                            {/* product image */}
                            <div>
                                <h2 className="text-xl font-medium">Product Media</h2>
                                <label className="text-sm font-medium block">Choose image to upload (PNG, JPG)</label>
                                {/* <img src={preview} alt="" /> */}
                                <div className=" border border-gray-400 border-dashed rounded-md bg-gray-50 relative">
                                    {preview ? <img className="absolute top-0 rounded-sm w-full h-full" src={preview} alt="product image" /> 
                                    : <div className="text-sm font-medium absolute top-[50%] left-[35%] ">
                                        <p>Select image</p>
                                    </div>}
                                    <input
                                        className="w-full h-[200px] opacity-0 cursor-pointer"
                                        type="file"
                                        {...register("image", {
                                            onChange: (e) => handleImage(e),
                                            required:pageTitle===EDIT_PRODUCT ? false : "Image is required.",
                                            validate:pageTitle===EDIT_PRODUCT?{} : {
                                                acceptedFormats: (files) => {
                                                      return files && files.length > 0 && ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || "Only JPEG, PNG, JPG are allowed."
                                                    // if (fileImageRef != null) {
                                                    //     return ['image/jpeg', 'image/png', 'image/jpg'].includes(fileImageRef.current.files[0]?.type) || "Only JPEG, PNG, JPG are allowed."
                                                    // } else if (files) {
                                                    //     return files && files.length > 0 && ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || "Only JPEG, PNG, JPG are allowed."

                                                    // }

                                                }
                                            },
                                        })}
                                        ref={(element) => {
                                            // connect RHF's ref + your own ref
                                            register("image").ref(element);
                                            fileImageRef.current = element;
                                    }}
                                    />
                                </div>
                                {errors.image?.message && <p className="text-md text-red-500">{errors.image.message}</p>}
                            </div>

                            <br />
                            {/* product category */}
                            <div>
                                <h2 className="text-xl font-medium">Category</h2>
                                <label className="text-sm font-medium block">Product Category</label>
                                <select  {...register("category", { required: "Category is required." })} className="border rounded-sm p-1 bg-gray-100 g w-full focus:border-orange-400 cursor-pointer"  >
                                    <option value="">Select category</option>
                                    {
                                        categories.map((category) => {
                                            return <option key={category.id} value={category.name}>{category.name}</option>
                                        })
                                    }
                                </select>
                                {errors.category?.message && <p className="text-md text-red-500">{errors.category.message}</p>}
                            </div>
                            <br />
                            {/* product delete */}
                            <div>
                                <h2 className="text-xl font-medium">Delete</h2>
                                <label className="text-sm font-medium block">Product Delete</label>
                                <select {...register("deleted")} className="border rounded-sm p-1 bg-gray-100 g w-full focus:border-orange-400 cursor-pointer"  >
                                    <option value="">Delete ?</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>

                        </div>

                    </div>


                </div>
            }

        </>
    );
}