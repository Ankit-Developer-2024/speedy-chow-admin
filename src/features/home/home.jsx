import { CiSearch } from "react-icons/ci";
import { ADD_PRODUCT, CONFIRMATION, DASHBOARD, RESET_FILTER } from "../../app/strings/appStrings";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync, data, loading, deleteProductAsync, category, fetchCategoryAsync, searchData, searchProductAsync, searchLoading } from "./homeSlice";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader";
import { POPModal } from "../../app/components/popModel";
import { getImageUrlFromBuffer } from "../../utils/utility";
import { PageHeading } from "../../app/components/pageHeading";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(data)
  const searchedData = useSelector(searchData)
  const categories = useSelector(category)
  const isLoading = useSelector(loading)
  const [isModalopen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([])
  const [searchResultUi, setSearchResultUi] = useState(false)
  const selectedSearchName = useRef("");
  const [deleteProductId,setDeleteProductId] =useState(-1) 

  function handleResetFilter() {
    selectedSearchName.current=""
    setSelectedCategory(()=>[])
    let data = { admin: true }
    dispatch(fetchProductAsync(data))
  }


  function handleProductSearch(e) {
    !searchResultUi && setSearchResultUi(true)
    if (e.target.value) {
      const data = { qName: e.target.value }
      dispatch(searchProductAsync(data))
    }
    selectedSearchName.current = e.target.value
    if (e.target.value.length == 0) {
      setSearchResultUi(false)
      let data = { admin: true }
      dispatch(fetchProductAsync(data))
    }
  }

  function handleSearchSelection(pName) {
    selectedSearchName.current = pName
    handleCategorySelection(-1)
  }


  function handleProductDeleteion() {
    setModalOpen(false) 
    dispatch(deleteProductAsync(deleteProductId)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
  }


  function handleDeletePop(id) {
     if(id!==-1){
     setModalOpen(true)
     setDeleteProductId(id)
     }
  }

  function handleCategorySelection(category) {
    if(category.length===0) return ;
    let data;
    let finalCategory;
    if (selectedCategory.includes(category)) {
      finalCategory = selectedCategory.filter((c) => c !== category)
      data = {
        admin: true,
        category: finalCategory,
        qName: selectedSearchName.current
      }
    } else {
      finalCategory = category === -1 ? [] : [...selectedCategory, category]
      data = {
        admin: true,
        category: finalCategory,
        qName: selectedSearchName.current
      }

    }

    dispatch(fetchProductAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
    setSelectedCategory((selectedCategory) => finalCategory)

  }

  useEffect(() => {
    let data = { admin: true }
    dispatch(fetchProductAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
    dispatch(fetchCategoryAsync())

  }, [dispatch])


  return (
    <>


      <div onClick={() => setSearchResultUi(false)} className="w-full px-5 py-3 relative">
        <Toaster />

        <div className="w-sm relative">
          <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 ">
            <input
              type="text"
              value={selectedSearchName.current ?? ""}
              onChange={(e) => handleProductSearch(e)}
              className="bg-white rounded-sm w-full outline-0 px-2 py-1"
              placeholder="Search..."
            />
            <CiSearch />
          </div>
          {searchResultUi && searchedData !== 0 && <ol className="bg-white w-sm absolute  z-1 ">
            {
              searchedData.map((product, index) => <li key={index} onClick={() => handleSearchSelection(product.name)} className="w-full px-2 pb-0.5 rounded-sm hover:bg-amber-500 font-medium text-md">{product.name}</li>)
            }
          </ol>}
        </div>

        <br />


        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <PageHeading pageName={DASHBOARD}></PageHeading>
          </div>

          <div className="flex flex-row items-center justify-end gap-3">
            <select name="category" onChange={(e) => handleCategorySelection(e.target.value)} className="bg-orange-400 text-white text-md font-medium p-2.5 rounded-md "  >
              <option className="bg-white text-black" value="">Category</option>
              {
                categories.map((category) => {
                  return <option key={category.id} className="bg-white text-black" value={category.name}>{category.name}</option>
                })
              }

            </select>
            <button
              onClick={() => navigate('/create-product')}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500"
            >{ADD_PRODUCT}</button>
            <button
               onClick={handleResetFilter}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500"
            >{RESET_FILTER}</button>


          </div>

          

        </div>
        {selectedCategory.length !== 0 && <p className="flex flex-row items-center justify-end text-md gap-2 font-medium">
          {selectedCategory.map((category, index) => {
            return <span key={index} className="bg-green-600 rounded-xl text-white px-2">{category} {<RxCross2 onClick={() => handleCategorySelection(category)} className="inline font-extrabold hover:bg-gray-50 rounded-xl hover:text-gray-600 text-xl" />}</span>
          })}

        </p>}
        <br />

        {/* items */}
        {
          isLoading ?
            <div className="w-full flex flex-row items-center justify-center">
              <Loader></Loader>
            </div>
            :
            <div className="flex flex-wrap justify-start gap-5">
              {/* item */}

              {products.length === 0 && isLoading === false ? <p className="text-xl font-bold text-center m-auto">No products found.</p> :
                products.map((product,index) => {
                  return <div key={product.id} className="bg-white rounded-xl px-5 py-3 w-[328px] relative">
                     
                    {isModalopen && (
                      <POPModal onClose={() => setModalOpen(false)} onOk={() => handleProductDeleteion()}>
                        <div className="w-full">
                          <h2 className="text-2xl font-bold text-center">{CONFIRMATION}</h2>
                          <p className="text-xl font-medium ">Are you sure you want to permanent delete product({deleteProductId}) from database?</p>
                        </div>
                      </POPModal>
                    )}
                    <div className="absolute right-5 flex flex-col gap-2">
                      <FiEdit onClick={() => navigate("/edit-product", { state: { product } })} className="h-9 w-9 p-1 rounded-sm bg-gray-200 hover:bg-gray-400 " />
                      <MdDeleteOutline onClick={() => handleDeletePop(product.id)} className="h-9 w-9 p-1 rounded-sm bg-gray-200 text-red-500 hover:bg-red-200 " />
                    </div>

                    <img className="w-full h-[250px] object-cover rounded-xl bg-gray-300 m-auto" src={product.image} alt="Product Image" loading="lazy" />
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
        }
      </div>


    </>
  )
}