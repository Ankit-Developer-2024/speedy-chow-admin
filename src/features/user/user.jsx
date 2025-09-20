import { CiSearch } from "react-icons/ci";
import { ADD_PRODUCT, ADD_USER, USERS } from "../../app/strings/appStrings";
import burgerImg from "../../assets/burger.jpeg"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, deleteMultipleUserAsync, deleteUserAsync, fetchAllUserAsync, loading, updateUserAsync } from "./userSlice";
import { getCaptilizeFirstLatter, getFormatedDate } from "../../utils/utility";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader"
import { POPModal } from "../../app/components/popModel";

export default function User() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(loading)
  const users = useSelector(data);
  const [showEditUIById, setShowEditUIById] = useState("");
  const [userIds, setUserIds] = useState([])
  const [isModalopen, setModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null)


  function handleSetShowEditUIById(id) {
    id === showEditUIById ? setShowEditUIById("") : setShowEditUIById(id)
  }


  function handleMultipleUserIds(id) {
    let index = userIds.findIndex((userId) => userId === id)

    if (index === -1 || userIds.length === 0) {
      setUserIds(userIds => [...userIds, id])
    } else {
      setUserIds(userIds => userIds.filter((userId) => userId !== id))
    }
  }

  function handleConfirmationBox(id) {
    setModalOpen(true)
    if (id !== -1) {
      setDeleteUserId(id)
    }

  }

  function handleConfirmationBoxOkay() {
    if(deleteUserId){
      handleUserDeleteion(deleteUserId)
    }else{
      handleDeleteMultipleUser()
    }
  }

  function handleDeleteMultipleUser() {
    setModalOpen(false)
    setDeleteUserId(null)
    if (userIds) {
      const data = { userIds }
      dispatch(deleteMultipleUserAsync(data)).unwrap().then((val) => {
        if (val.success) {
          (() => toast.success(val.message))();
          setUserIds(userIds => [])
        } else {
          (() => toast.error(val.message))();
          setUserIds(userIds => [])
        }
      })
    } else {
      (() => toast.success("No user selected"))();
    }
  }

  function handleCheckBoxAll() {
    setUserIds(userIds => [])
    if (userIds.length !== users.length) {
      setUserIds(userIds => users.map((userId) => userId.id))
    }

  }

  function handleUserUpdate(e, id) {
    let data = {
      id: id,
      data: { [e.target.name]: e.target.value }
    }
    dispatch(updateUserAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
        setShowEditUIById("")
      } else {
        (() => toast.error(val.message))();
        setShowEditUIById("")
      }
    })
  }

  function handleUserDeleteion(id) {
    setModalOpen(false)
    setDeleteUserId(null)
    dispatch(deleteUserAsync(id)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        (() => toast.error(val.message))();
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllUserAsync()).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        val.message ?
          (() => toast.error(val.message))() : (() => toast.error("User not fetched"))();
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
          <h1 className="text-3xl font-bold">{USERS}</h1>
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
            <button
              onClick={() => navigate('/user/create-user')}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500"
            >{ADD_USER}</button>
          </div>

          <br />

          {/* items */}

          <div className="w-full">

            <table className="table-fixed border-collapse  w-full">
              <thead className="bg-slate-600 text-white">
                <tr className=" place-content-start  items-start">
                  <th className="w-7"> <input onChange={handleCheckBoxAll} checked={userIds.length === users.length} type="checkbox" /> </th>
                  <th className="font-medium text-start py-1">Full Name</th>
                  <th className="font-medium text-start">Email</th>
                  <th className="font-medium text-start">Status</th>
                  <th className="font-medium text-start">Role</th>
                  <th className="font-medium text-start">Joined Date</th>
                  {userIds.length === 0 ? <th className="font-medium text-start ">Action</th>
                    : <th className="text-center"><RiDeleteBin5Fill onClick={() => handleConfirmationBox()} className=" hover:text-red-500"></RiDeleteBin5Fill></th>
                  }
                </tr>
              </thead>

              <tbody className="text-gray-600 w-full ">
                {
                  users.map((user, index) => {
                    return <tr key={user.id} className={index % 2 === 0 ? "border-b border-orange-100 bg-white" : "border-b border-orange-100 bg-orange-50"}>
                      <td className="text-center">
                        <input onChange={() => handleMultipleUserIds(user.id)} checked={userIds.includes(user.id)} type="checkbox" />
                      </td>
                      <td className="flex  gap-2 py-2">
                        <img className="w-6 h-6 rounded-full" src={burgerImg} alt="img" />
                        <p className="text-md font-medium">{getCaptilizeFirstLatter(user.name)}</p>
                      </td>
                      <td >
                        <p className="text-md font-medium"> {user.email}</p>
                      </td>
                      <td>
                        {showEditUIById === user.id ?
                          <select name="status" onChange={(e) => handleUserUpdate(e, user.id)} className="text-md font-medium p-0 m-0">
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Block">Block</option>
                            <option value="Delete">Delete</option>
                          </select>
                          : <span className={user.status == 'Active' ? "bg-green-500 text-white rounded-2xl px-2 py-0.5 text-md font-medium" : "bg-red-600 text-white rounded-2xl px-2 py-0.5 text-md font-medium"}>{user.status}</span>
                        }
                      </td>
                      <td>
                        {showEditUIById === user.id ?
                          <select name="role" onChange={(e) => handleUserUpdate(e, user.id)} className="text-md font-medium p-0 m-0">
                            <option value="">Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          : <span className="text-md font-medium">{getCaptilizeFirstLatter(user.role)}</span>}
                      </td>
                      <td >
                        <p className="text-md font-medium">{getFormatedDate(user.joinedAt)}</p>
                      </td>
                      <td className="items-start text-center ">
                        {userIds.length === 0 && <div className="flex gap-3">
                          <FiEdit onClick={() => handleSetShowEditUIById(user.id)} className="text-xl text-gray-500 hover:text-gray-700" />
                          <RiDeleteBin5Fill onClick={() => handleConfirmationBox(user.id)} className="text-red-500 text-xl hover:text-red-700" />
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