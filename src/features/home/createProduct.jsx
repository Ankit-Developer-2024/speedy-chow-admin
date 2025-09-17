import { useEffect, useState } from "react";
import { ADD_PRODUCT } from "../../app/strings/appStrings";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { category, createProductAsync, fetchCategoryAsync, loading } from "./homeSlice";
import {Loader} from "../../app/components/loader"


export const CreateProduct = () => {
    const dispatch = useDispatch()
    const [preview, setPreview] = useState(""); 
    const categories = useSelector(category)
    const isLoading = useSelector(loading)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
 


    function handleImage(e) {
        const image = watch('image');
        const imagePreview = image ? URL.createObjectURL(image[0]) : null;  
        setPreview(imagePreview)
    }

    
    function onSubmit(data) { 

        let productDetails={
            name:data.name,
            description:data.description,
            price:data.price,
            totalQuantity:data.totalQuantity,
            category:data.category
        }
        
        if(data.discountPercentage!==""){
            productDetails['discountPercentage']=data.discountPercentage
        }
        if(data.rating!==""){
            productDetails["rating"]=data.rating
        }
        if(data.deleted!==""){
            productDetails.deleted=data.deleted
        }
        
        const formData = new FormData();
        formData.append("productDetails",JSON.stringify(productDetails))
        formData.append('image',data.image[0] );   

        dispatch(createProductAsync(formData))         

    }

    useEffect(()=>{
        if (categories.length===0) {
            dispatch(fetchCategoryAsync())
        }
        console.log(categories);
        
    },[dispatch,categories])



    return (
        <>
            {isLoading ?
                <div className="w-full flex flex-row items-center justify-center">
                    <Loader></Loader>
                </div>
                :
                
                 <div className="px-5 py-3 w-full">
                <div className=" flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{ADD_PRODUCT}</h1>
                        <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p>
                    </div>
                </div>
                <br />

                <div className="bg-white p-5 rounded-xl flex flex-row gap-3 w-full items-start justify-between">

                    <form className="w-[65%]" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-xl font-medium block" >Name:</label>

                        <input
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Product Name" {...register("name",{required:"Name is required."})}
                        />
                        {errors.name?.message && <p className="text-md text-red-500">{errors.name.message}</p>}

                        {/* Description */}
                        <label className="text-xl font-medium block" for="description">Description:</label>
                        <textarea
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            cols="10"
                            rows="4"
                            placeholder="Description" {...register("description",{required:"Description is required."})}
                        />
                        {errors.description?.message && <p className="text-md text-red-500">{errors.description.message}</p>}

                        {/* price */}
                        <label className="text-xl font-medium block" for="price">Price:</label>
                        <input
                            type="number"
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Price" {...register("price",{required:"Price is required.",minLength:{value:1,message:"Minimum price is 1"}})}
                        />
                         {errors.price?.message && <p className="text-md text-red-500">{errors.price.message}</p>}

                        {/* Discount Percentage */}
                        <label className="text-xl font-medium block" for="discountPercentage">Discount Percentage(%):</label>
                        <input
                            type="number"
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Discount percentage" {...register("discountPercentage",{min:{value:0,message:"Minimum Discount Percentage is 0"},max:{value:100,message:"Maximum Discount Percentage is 100"}})}
                        />
                        {errors.discountPercentage?.message && <p className="text-md text-red-500">{errors.discountPercentage.message}</p>}

                        {/* totalQuantity */}
                        <label className="text-xl font-medium block" for="totalQuantity">Total Quantity:</label>
                        <input
                            type="number"
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Total quantity" {...register("totalQuantity",{required:"Total quantity required.",minLength:{value:0,message:"Minimum quantity is 0"}})}
                        />
                         {errors.totalQuantity?.message && <p className="text-md text-red-500">{errors.totalQuantity.message}</p>}

                        {/* Rating */}
                        <label className="text-xl font-medium block" for="rating">Rating:</label>
                        <input
                            type="number"
                            className="bg-gray-50 w-full mb-2 text-xl border  rounded-sm p-1 focus:outline-none focus:border-orange-400"
                            placeholder="Rating" {...register("rating",{minLength: {value:0,message:"Minimum rating is 0"}, maxLength: 5})}
                        />
                         {errors.rating?.message && <p className="text-md text-red-500">{errors.rating.message}</p>}
 
                        <input className="bg-orange-400 py-2 px-5 rounded-md font-medium text-white hover:bg-amber-500" type="submit" value="Create"/>
                         
                     </form>


 
                    <div>
                        {/* product image */}
                        <div>
                            <h2 className="text-xl font-medium">Product Media</h2>
                            <label className="text-sm font-medium block" for="image_uploads">Choose image to upload (PNG, JPG)</label>
                            {/* <img src={preview} alt="" /> */}
                            <div className=" border border-gray-400 border-dashed rounded-md bg-gray-50 relative">
                                {preview ? <img className="absolute top-0 rounded-sm w-full h-full" src={preview} alt="" /> : <div className="text-sm font-medium absolute top-[50%] left-[35%] ">
                                    <p>Selecte image</p>
                                </div>}
                                <input
                                    className="w-full h-[200px] opacity-0"
                                    type="file"
                                    {...register("image", {
                                        onChange: (e) => handleImage(e),
                                        required: "Image is required",
                                        validate: {
                                            acceptedFormats: (files) =>
                                                ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || "Only JPEG, JPG are allowed",
                                        },
                                    })}
                                />
                                
                            </div>
                             {errors.image?.message && <p className="text-md text-red-500">{errors.image.message}</p>}
                        </div>

                        <br />
                        {/* product category */}
                        <div>
                            <h2 className="text-xl font-medium">Category</h2>
                            <label className="text-sm font-medium block" for="image_uploads">Product Category</label>
                            <select {...register("category",{required:"Category is required."})} className="border rounded-sm p-1 bg-gray-100 g w-full focus:border-orange-400 "  >
                                <option value="">Select category</option>
                                {
                                    categories.map((category)=>{
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
                            <label className="text-sm font-medium block" for="image_uploads">Product Delete</label>
                            <select {...register("deleted")}  className="border rounded-sm p-1 bg-gray-100 g w-full focus:border-orange-400 "  >
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