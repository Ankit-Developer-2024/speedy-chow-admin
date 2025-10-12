import { CiSearch } from "react-icons/ci";
import { ADD_PRODUCT, ADD_USER, CONFIRMATION, RESET_FILTER, USERS } from "../../app/strings/appStrings";
import burgerImg from "../../assets/burger.jpeg"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, deleteMultipleUserAsync, deleteUserAsync, fetchAllUserAsync, loading, searchData, searchUserAsync, updateUserAsync } from "./userSlice";
import { getCaptilizeFirstLatter, getFormatedDate } from "../../utils/utility";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "../../app/components/loader"
import { POPModal } from "../../app/components/popModel";
import { PageHeading } from "../../app/components/pageHeading";

export default function User() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(loading)
  const users = useSelector(data);
  let searchedUser = useSelector(searchData)
  const [showEditUIById, setShowEditUIById] = useState("");
  const [userIds, setUserIds] = useState([])
  const [isModalopen, setModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [searchResultUi, setSearchResultUi] = useState(false)
  let selectedSearchName = useRef("");
  let selectedSearchRole = useRef("");
  let selectedSearchStatus = useRef("");

  function handleResetFilter() {
    selectedSearchName.current = ""
    selectedSearchRole.current = ""
    selectedSearchStatus.current = ""
    dispatch(fetchAllUserAsync())
  }


  function handleUserRoleSearch(e) {
    console.log(e.target.value.length);

    selectedSearchRole.current = e.target.value
    console.log(selectedSearchRole);
    let data = {};
    if (selectedSearchRole.current.length > 0) { data.role = selectedSearchRole.current }

    if (selectedSearchStatus.current.length > 0) data.status = selectedSearchStatus.current

    if (selectedSearchName.current.length > 0) data.name = selectedSearchName.current

    dispatch(fetchAllUserAsync(data))

  }

  function handleUserStatusSearch(e) {
    selectedSearchStatus.current = e.target.value
    let data = {};
    if (selectedSearchRole.current.length > 0) data.role = selectedSearchRole.current

    if (selectedSearchStatus.current.length > 0) data.status = selectedSearchStatus.current

    if (selectedSearchName.current.length > 0) data.name = selectedSearchName.current

    dispatch(fetchAllUserAsync(data))
  }


  function handleUserSearch(e) {
    !searchResultUi && setSearchResultUi(true)
    if (e.target.value) {
      const data = { qName: e.target.value }
      dispatch(searchUserAsync(data))
    }
    selectedSearchName.current = e.target.value

    if (e.target.value.length == 0) {
      setSearchResultUi(false)
      dispatch(fetchAllUserAsync())
    }
  }

  function handleSearchSelection(uName) {
    selectedSearchName.current = uName
    let data = { qName: uName }
    searchedUser = []
    dispatch(fetchAllUserAsync(data)).unwrap().then((val) => {
      if (val.success) {
        (() => toast.success(val.message))();
      } else {
        val.message ?
          (() => toast.error(val.message))() : (() => toast.error("User not fetched"))();
      }
    })
  }


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
    if (id !== -1) {
      setModalOpen(true)
      setDeleteUserId(id)
    }

  }

  function handleConfirmationBoxOkay() {
    if (deleteUserId) {
      handleUserDeleteion(deleteUserId)
    } else {
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

      <div onClick={() => setSearchResultUi(false)} className="px-5 py-3 w-full  ">
        <Toaster />

        <PageHeading pageName={USERS}></PageHeading>
        <br />

        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 w-sm">
              <input
                type="text"
                value={selectedSearchName.current ?? ""}
                onChange={(e) => handleUserSearch(e)}
                className="bg-white rounded-sm w-full  outline-0 px-2 py-1"
                placeholder="Search..."
              />
              <CiSearch className="" />
            </div>
            <select name="role" value={selectedSearchRole.current} onChange={(e) => handleUserRoleSearch(e)} className="border border-orange-500 rounded-2xl text-md font-medium p-1 px-2 cursor-pointer">
              <option value="">Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select name="status" value={selectedSearchStatus.current} onChange={(e) => handleUserStatusSearch(e)} className="border border-orange-500 rounded-2xl text-md font-medium p-1 px-2 cursor-pointer">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Block">Block</option>
            </select>

          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={handleResetFilter}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500 cursor-pointer"
            >{RESET_FILTER}</button>
            <button
              onClick={() => navigate('/user/create-user')}
              className="bg-orange-400 p-2 rounded-md font-medium text-white hover:bg-amber-500 cursor-pointer"
            >{ADD_USER}</button>
          </div>
        </div>
        {searchResultUi && searchedUser !== 0 && <ol className="bg-white w-sm absolute z-1 ">
          {
            searchedUser.map((user, index) => <li key={index} onClick={() => handleSearchSelection(user.name)} className="w-full px-2 pb-0.5 rounded-sm hover:bg-amber-500 font-medium text-md">{user.name}</li>)
          }
        </ol>}

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
                  <th className="w-7 cursor-pointer"> <input onChange={handleCheckBoxAll} checked={userIds.length === users.length} type="checkbox" /> </th>
                  <th className="font-medium text-start py-1">Full Name</th>
                  <th className="font-medium text-start">Email</th>
                  <th className="font-medium text-start">Status</th>
                  <th className="font-medium text-start">Role</th>
                  <th className="font-medium text-start">Joined Date</th>
                  {userIds.length === 0 ? <th className="font-medium text-start ">Action</th>
                    : <th className="text-center"><RiDeleteBin5Fill onClick={() => handleConfirmationBox()} className=" hover:text-red-500 cursor-pointer"></RiDeleteBin5Fill></th>
                  }
                </tr>
              </thead>

              <tbody className="text-gray-600 w-full ">
                {
                  users.map((user, index) => {
                    return <tr key={user.id} className={index % 2 === 0 ? "border-b border-orange-100 bg-white" : "border-b border-orange-100 bg-orange-50"}>
                      <td className="text-center r">
                        <input  onChange={() => handleMultipleUserIds(user.id)} checked={userIds.includes(user.id)} type="checkbox" className="cursor-pointer" />
                      </td>
                      <td className="flex  gap-2 py-2">
                        { user.image ? <img className="w-6 h-6 rounded-full" src={user.image} alt="img" loading="lazy" /> : <p className="w-6 h-6 rounded-full bg-orange-400 text-white text-center">{getCaptilizeFirstLatter(user.name).substring(0,1)}</p> }
                        <p className="text-md font-medium">{getCaptilizeFirstLatter(user.name)}</p>
                      </td>
                      <td >
                        <p className="text-md font-medium"> {user.email}</p>
                      </td>
                      <td>
                        {showEditUIById === user.id ?
                          <select name="status" onChange={(e) => handleUserUpdate(e, user.id)} className="text-md font-medium p-0 m-0 cursor-pointer"  >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Block">Block</option>
                            <option value="Delete">Delete</option>
                          </select>
                          : <span className={user.status == 'Active' ? "bg-green-500 text-white rounded-2xl px-2 py-0.5 text-md font-medium  " : "bg-red-600 text-white rounded-2xl px-2 py-0.5 text-md font-medium"}>{user.status}</span>
                        }
                      </td>
                      <td>
                        {showEditUIById === user.id ?
                          <select name="role" onChange={(e) => handleUserUpdate(e, user.id)} className="text-md font-medium p-0 m-0 cursor-pointer">
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
                          <FiEdit onClick={() => handleSetShowEditUIById(user.id)} className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                          <RiDeleteBin5Fill onClick={() => handleConfirmationBox(user.id)} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
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