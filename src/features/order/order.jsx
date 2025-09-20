import { CiSearch } from "react-icons/ci";
import { ORDER } from "../../app/strings/appStrings";
import burgerImg from "../../assets/burger.jpeg"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormatedDate } from "../../utils/utility";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader"
import { POPModal } from "../../app/components/popModel";
import { data, loading , fetchAllOrderAsync, updateOrderAsync, deleteOrderAsync, deleteMultipleOrderAsync } from "./orderSlice";

export default function Order() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(loading)
  const orders = useSelector(data); 
  const [showEditUIById, setShowEditUIById] = useState("");
  const [orderIds, setOrderIds] = useState([])
  const [isModalopen, setModalOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null)


  function handleSetShowEditUIById(id) {
    id === showEditUIById ? setShowEditUIById("") : setShowEditUIById(id)
  }


  function handleMultipleOrderIds(id) {
    let index = orderIds.findIndex((userId) => userId === id)

    if (index === -1 || orderIds.length === 0) {
      setOrderIds(orderIds => [...orderIds, id])
    } else {
      setOrderIds(orderIds => orderIds.filter((userId) => userId !== id))
    }
  }

  function handleConfirmationBox(id) {
    setModalOpen(true)
    if (id !== -1) {
      setDeleteOrderId(id)
    }

  }

  function handleConfirmationBoxOkay() {
    if(deleteOrderId){
      handleOrderDeleteion(deleteOrderId)
    }else{
      handleDeleteMultipleOrder()
    }
  }

  function handleDeleteMultipleOrder() {
    setModalOpen(false)
    setDeleteUserId(null)
    if (orderIds) {
      const data = { orderIds }
      dispatch(deleteMultipleOrderAsync(data)).unwrap().then((val) => {
        if (val.success) {
          (() => toast.success(val.message))();
          setOrderIds(orderIds => [])
        } else {
          (() => toast.error(val.message))();
          setOrderIds(orderIds => [])
        }
      })
    } else {
      (() => toast.success("No user selected"))();
    }
  }

  function handleCheckBoxAll() {
    setOrderIds(orderIds => [])
    if (orderIds.length !== orders.length) {
      setOrderIds(orderIds => orders.map((userId) => userId.id))
    }

  }

  function handleUpdateOrder(e, id) {
    let data = {
      id: id,
      data: { [e.target.name]: e.target.value }
    }
    dispatch(updateOrderAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
        setShowEditUIById("")
      } else {
        (() => toast.error(val.message))();
        setShowEditUIById("")
      }
    })
  }

  function handleOrderDeleteion(id) {
    setModalOpen(false)
    setDeleteOrderId(null)
    dispatch(deleteOrderAsync(id)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllOrderAsync()).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        val.message ?
          (() => toast.error(val.message))() : (() => toast.error("Orders not fetched"))();
      }
    })

  }, [dispatch])
 
  

  return (
    <>
      {isLoading ?
        <div className="w-full flex flex-row items-center justify-center">
          <Loader></Loader>
        </div>
        :
        <div className="px-5 py-3 w-full ">
          <Toaster />
          {isModalopen && (
            <POPModal onClose={() => setModalOpen(false)} onOk={() => handleConfirmationBoxOkay()}>
              <div className="w-full">
                <h2 className="text-2xl font-bold text-center">Confirmation</h2>
                <p className="text-xl font-medium ">Are you sure you want to permanent delete user from database?</p>
              </div>
            </POPModal>
          )}
          <h1 className="text-3xl font-bold">{ORDER}</h1>
          <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p>
          <br />

          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 w-sm">
              <input
                type="text"
                className="bg-white rounded-sm  outline-0 px-2 py-1"
                placeholder="Search..."
              />
              <CiSearch className="" />
            </div> 
          </div>

          <br />

          {/* items */}

          <div className="w-full">

            <table className="table-fixed border-collapse  w-full">
              <thead className="bg-slate-600 text-white">
                <tr className=" place-content-start  items-start">
                  <th className="w-7"> <input onChange={handleCheckBoxAll} checked={orderIds.length === orders.length} type="checkbox" /> </th>
                  <th className="font-medium text-start py-1">Order Id</th>
                  <th className="font-medium text-start">Created Date</th>
                  <th className="font-medium text-start">Customer</th>
                  <th className="font-medium text-start">Payment</th>
                  <th className="font-medium text-start">Items</th> 
                  <th className="font-medium text-start">Total</th> 
                  <th className="font-medium text-start">Status</th> 
                  {orderIds.length === 0 ? <th className="font-medium text-start ">
                       <div className="flex flex-row items-center justify-center">Action</div>
                    </th>
                    : <th >
                       <div className="flex flex-row items-center justify-center">
                         <RiDeleteBin5Fill onClick={() => handleConfirmationBox(-1)} className=" hover:text-red-500"></RiDeleteBin5Fill>
                
                       </div>
                        </th>
                  }
                </tr>
              </thead>

              <tbody className="text-gray-600 w-full ">
                {
                  orders.map((order, index) => {
                    return <tr key={order.id} className={index % 2 === 0 ? "border-b border-orange-100 bg-white" : "border-b border-orange-100 bg-orange-50"}>
                      <td className="text-center">
                        <input onChange={() => handleMultipleOrderIds(order.id)} checked={orderIds.includes(order.id)} type="checkbox" />
                      </td>
                      <td> 
                        <p className="text-md font-medium overflow-x-auto py-1">#{order.id.substring(0,5)}...</p>
                      </td>
                      <td >
                        <p className="text-md font-medium"> {getFormatedDate(order.createdAt)}</p>
                      </td>
                      <td className="group relative">
                         <p className="text-md font-medium">#{order.user.substring(0,5)}...</p>
                         <p className="invisible bg-white z-1 rounded-md p-1 font-medium absolute group-hover:visible ">{order.user}</p>
                      </td>
                      <td>
                        <p className="text-md font-medium">{order.paymentMethod}</p>
                      </td>
                      <td>
                        <p className="text-md font-medium">{order.totalItems} Items</p>
                      </td>
                       <td>
                        <p className="text-md font-medium">&#8377; {order.totalAmount}</p>
                      </td>
                      <td>
                        { showEditUIById ===order.id  ? 
                            <select name="status" onChange={(e)=>handleUpdateOrder(e,order.id)} >
                                <option value="">Select Status</option>
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="Preparing Food">Preparing Food</option>
                                <option value="Out For Delivery">Out For Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                          : <p className="bg-green-500 text-white rounded-3xl px-2 py-0.5 text-sm font-medium truncate">{order.status}</p>
                        }  
                      </td>
                      <td  >
                        {orderIds.length === 0 && <div className="flex items-center justify-center gap-3">
                          <FiEdit onClick={() => handleSetShowEditUIById(order.id)} className="text-xl text-gray-500 hover:text-gray-700" />
                          <RiDeleteBin5Fill onClick={() => handleConfirmationBox(order.id)} className="text-red-500 text-xl hover:text-red-700" />
                        </div>}
                      </td>
                    </tr>
                  })
                }
              </tbody>

            </table>


          </div>



        </div>
      }
    </>
  );
}