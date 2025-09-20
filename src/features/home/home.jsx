import { CiSearch } from "react-icons/ci";
import { ADD_PRODUCT, DASHBOARD } from "../../app/strings/appStrings";
import burgerImg from "../../assets/burger.jpeg"
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync, data, loading, deleteProductAsync } from "./homeSlice";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader";
import { POPModal } from "../../app/components/popModel";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(data)
  const isLoading = useSelector(loading)
  const [isModalopen, setModalOpen] = useState(false);

  function handleProductDeleteion(id) {
    setModalOpen(false)
    dispatch(deleteProductAsync(id)).unwrap().then((val) => {
      if (val.success) { 
        (() => toast.success(val.message))();
      } else { 
        (() => toast.error(val.message))();
      }
    })
  }

  useEffect(() => {
    dispatch(fetchProductAsync()).unwrap().then((val) => {
      if (val.success) { 
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
  }, [dispatch])

  return (
    <>

       {
          isLoading ?
                  <div className="w-full flex flex-row items-center justify-center">
                    <Loader></Loader>
                  </div>
        :
          <div className="w-full px-5 py-3 relative">
        <Toaster />
       
        <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 w-sm">
          <input
            type="text"
            className="bg-white rounded-sm  outline-0 px-2 py-1"
            placeholder="Search..."
          />
          <CiSearch className="" />
        </div>

        <br />


        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{DASHBOARD}</h1>
            <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p>
          </div>

          <button
            onClick={() => navigate('/create-product')}
            className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500"
          >{ADD_PRODUCT}</button>
        </div>

        <br />

        {/* items */}
        <div className="flex flex-wrap justify-start gap-5">
          {/* item */}

          {
            products.map((product) => {
              return <div key={product.id} className="bg-white rounded-xl px-5 py-3 xl:w-[450px] relative">
                     {isModalopen && (
                    <POPModal onClose={() => setModalOpen(false)} onOk={() => handleProductDeleteion(product.id)}>
                      <div className="w-full">
                        <h2 className="text-2xl font-bold text-center">Confirmation</h2>
                        <p className="text-xl font-medium ">Are you sure you want to permanent delete user from database?</p>
                      </div>
                    </POPModal>
                  )}
                <div className="absolute right-5 flex flex-col gap-2">
                  <FiEdit onClick={() => navigate("/edit-product", { state: { product } })} className="h-9 w-9 p-1 rounded-sm bg-gray-200 hover:bg-gray-400 " />
                  <MdDeleteOutline onClick={()=>setModalOpen(true)} className="h-9 w-9 p-1 rounded-sm bg-gray-200 text-red-500 hover:bg-red-200 " />
                </div>

                <img className=" w-[250px] bg-gray-300 m-auto" src={burgerImg} alt="Product Image" loading="lazy" />
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex flex-row items-center justify-start gap-2">
                  <FaStar className="text-orange-600" />
                  <p className="font-medium">{product.rating}</p>
                </div>

                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-medium "><span className="line-through text-gray-400">$ {product.price}</span> ${product.discountedPrice}</p>
                  <p className="font-medium">{product.discountPercentage}% Discount</p>
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className={product.totalQuantity === 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>{product.totalQuantity > 0 ? "In Stock" : "Out of Stock"}</p>
                  <p className="font-medium">{product.totalQuantity} items</p>
                </div>
                {product.deleted ? <p className="font-medium text-red-600">Deleted product</p> : <br />}

              </div>
            })
          }


        </div>

      </div>
       }

    </>
  )
}