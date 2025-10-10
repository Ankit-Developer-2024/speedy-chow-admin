import { NavLink, useNavigate } from "react-router";
import { MODERN_ADMIN_PANEL, SPEEDY_CHOW } from "../../app/strings/appStrings";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, signOutAsync, user } from "./sideBarSlice";
import { POPModal } from "../../app/components/popModel";
import toast from "react-hot-toast";

export default function SideBar({ children }) {

  const dispatch = useDispatch()
  const userData = useSelector(user)
  const navigate = useNavigate()
  let [showSignOutPop, setShowSignOutPop] = useState(false)

  const navigation = [
    { name: "Dashboard", icon: <IoHomeOutline></IoHomeOutline>, link: '/' },
    { name: "Category", icon: <IoHomeOutline></IoHomeOutline>, link: '/category' },
    { name: "Users", icon: <FaRegUser></FaRegUser>, link: '/user' },
    { name: "Order", icon: <BiSolidFoodMenu />, link: '/order' },
  ]

  function handleSignOut() {
    dispatch(signOutAsync()).unwrap().then((val)=>{
      if(val.success){
          (()=>toast(val.message))()
           navigate('/login') 
      }else{
           (()=>toast("Log out again!"))() 
      }
    })
  }

  useEffect(() => {
    dispatch(getUserAsync())
  },[dispatch])

  return (
    <>

      <div className="flex flex-row bg-gray-100 h-svh overflow-hidden">
        <div className="w-[200px] h-svh bg-white  ">
          <div className="p-5">
            <h1 className="text-2xl font-bold text-orange-500">{SPEEDY_CHOW}</h1>
            <p className="text-sm text-gray-400 mt-1">{MODERN_ADMIN_PANEL}</p>
          </div>


          {/* list of pages */}
          <div className="p-0 h-[500px] flex flex-col justify-between items-start  w-[200px] ">
            {/* item */}
            <div className="flex flex-col gap-2">
              {navigation.map((item, index) => {
                return <div key={index} className="flex flex-row items-center justify-start gap-4">
                  <NavLink to={item.link}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "oklch(70.5% 0.213 47.604)" : "white",
                    })}
                    className="min-h-lh w-1 rounded-r-full py-1.5"><p className="opacity-0">|</p></NavLink>
                  <NavLink to={item.link} className="flex flex-row items-center  justify-start gap-2 p-1.5 rounded-md w-[150px] ">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </div>
              })}
            </div>


            <div className="mb-2 ml-5 w-[150px]">
             {userData &&  <div className="group relative flex flex-row items-center justify-start py-2  gap-2">
                <span className="bg-orange-400  px-2  text-2xl text-white rounded-full">{userData.name.trim().substring(0, 1)}</span>
                <span className="text-2xl font-medium ov line-clamp-1">{userData.name}</span>
                <p className="absolute left-10 -top-2 bg-gray-100 p-1 rounded-md invisible group-hover:visible">{userData.name.trim()}</p>
             </div>
             }
               
               {showSignOutPop  &&<POPModal onOk={handleSignOut} onClose={()=>setShowSignOutPop(false)}>
                <h2 className="text-center text-xl font-medium">Sign out</h2>
                <p>Are you sure you want to sign out?</p>
               </POPModal>}
                <div onClick={()=>setShowSignOutPop(true)} className="text-center p-2 border rounded-md border-orange-500 text-xl hover:bg-red-500 hover:border-red-500 hover:text-white ">
                    Log Out
                </div>
            </div>




          </div>
        </div>
         <div className="overflow-y-scroll grow-[1]">
           {children}
         </div>
      </div>
    </>
  )
}