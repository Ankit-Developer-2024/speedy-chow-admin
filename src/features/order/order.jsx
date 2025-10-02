import { CiSearch } from "react-icons/ci";
import { CONFIRMATION, ORDER, RESET_FILTER } from "../../app/strings/appStrings";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormatedDate } from "../../utils/utility";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader"
import { POPModal } from "../../app/components/popModel";
import { data, loading, fetchAllOrderAsync, updateOrderAsync, deleteOrderAsync, deleteMultipleOrderAsync } from "./orderSlice";
import { PageHeading } from "../../app/components/pageHeading";

export default function Order() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(loading)
  const orders = useSelector(data);
  const [showEditUIById, setShowEditUIById] = useState("");
  const [orderIds, setOrderIds] = useState([])
  const [isModalopen, setModalOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null)
  const selectedSearchName = useRef("");
  let filterByPaymentMethod = useRef("");
  let filterByOrderStatus = useRef("");

  function handleResetFilter() {
    selectedSearchName.current=""
    filterByOrderStatus.current=""
    filterByPaymentMethod.current=""
    dispatch(fetchAllOrderAsync())
  }

  function handleFilterByPaymentMethod(paymentStatus) {
    filterByPaymentMethod.current = paymentStatus
    let data = {}
    if (filterByPaymentMethod.current.length > 0) data.paymentMethod = filterByPaymentMethod.current

    if (filterByOrderStatus.current.length > 0) data.status = filterByOrderStatus.current

    dispatch(fetchAllOrderAsync(data))
  }

  function handleFilterByOrderStatus(orderStatus) {
    filterByOrderStatus.current = orderStatus
    let data = {}
    if (filterByPaymentMethod.current.length > 0) data.paymentMethod = filterByPaymentMethod.current

    if (filterByOrderStatus.current.length > 0) data.status = filterByOrderStatus.current

    dispatch(fetchAllOrderAsync(data))
  }

  function handleOrderSearch(e) {
    if (e.target.value) {
      const data = {
        id: e.target.value
      }
      dispatch(fetchAllOrderAsync(data))
    }
    selectedSearchName.current = e.target.value
    if (e.target.value.length == 0) {
      dispatch(fetchAllOrderAsync())
    }
  }


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
    if (deleteOrderId) {
      handleOrderDeleteion(deleteOrderId)
    } else {
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
      <div className="px-5 py-3 w-full ">
        <Toaster />
        
        <PageHeading pageName={ORDER}></PageHeading>
        <br />

        <div className="w-full flex flex-row items-center justify-between">
          <div className=" flex flex-row items-center justify-start gap-2">
            <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 w-sm">
              <input
                type="text"
                value={selectedSearchName.current ?? ""}
                onChange={(e) => handleOrderSearch(e)}
                autoFocus
                className="bg-white rounded-sm w-full outline-0 px-2 py-1"
                placeholder="Search..."
              />
              <CiSearch className="" />
            </div>
            <select name="role" value={filterByPaymentMethod.current} onChange={(e) => handleFilterByPaymentMethod(e.target.value)} className="border border-orange-500 rounded-2xl text-md font-medium p-1 px-2">
              <option value="">Payment Status</option>
              <option value="cod">COD</option>
              <option value="upi">UPI</option>
            </select>
            <select name="status" value={filterByOrderStatus.current} onChange={(e) => handleFilterByOrderStatus(e.target.value)} className="border border-orange-500 rounded-2xl text-md font-medium p-1 px-2">
              <option value="">Order Status</option>
              <option value="Order Confirmed">Order Confirmed</option>
              <option value="Preparing Food">Preparing Food</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <button
               onClick={handleResetFilter}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500"
            >{RESET_FILTER}</button>
          </div>
        </div>

        <br />

        {/* items */}
        {isLoading ?
          <div className="w-full flex flex-row items-center justify-center">
            <Loader></Loader>
          </div>
          :

          <div className="w-full">
            {isModalopen && (
              <POPModal onClose={() => setModalOpen(false)} onOk={() => handleConfirmationBoxOkay()} bgColor={"bg-[#00000090]"}>
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-center">{CONFIRMATION}</h2>
                  <p className="text-xl font-medium ">Are you sure you want to permanent delete user from database?</p>
                </div>
              </POPModal>
            )}

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
                      <td className="group relative">
                        <p className="text-md font-medium py-1">#{order.id.substring(0, 5)}...</p>
                        <p className="invisible bg-white z-1 rounded-md p-1 font-medium absolute group-hover:visible ">{order.id}</p>
                      </td>
                      <td >
                        <p className="text-md font-medium"> {getFormatedDate(order.createdAt)}</p>
                      </td>
                      <td className="group relative">
                        <p className="text-md font-medium">#{order.user.substring(0, 5)}...</p>
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
                        {showEditUIById === order.id ?
                          <select name="status" onChange={(e) => handleUpdateOrder(e, order.id)} >
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
        }



      </div>

    </>
  );
}