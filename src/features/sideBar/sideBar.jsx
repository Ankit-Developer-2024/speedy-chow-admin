import { NavLink, useNavigate } from "react-router";
import { MODERN_ADMIN_PANEL, SPEEDY_CHOW } from "../../app/strings/appStrings";
import { FaRegUser  } from "react-icons/fa";
import { IoHomeOutline  } from "react-icons/io5";
import { useEffect } from "react";

export default function SideBar({children}) {
     const navigate = useNavigate();
     

    const navigation=[
        {name:"Dashboard" , icon:<IoHomeOutline></IoHomeOutline>,link:'/'},
        {name:"Users" , icon:<FaRegUser></FaRegUser>,link:'/user'}, 
       ]

    return (
        <>
        
          <div className="flex bg-gray-100">
            <div className="w-[200px] h-svh bg-white">
                <div className="p-5">
                 <h1 className="text-2xl font-bold text-orange-500">{SPEEDY_CHOW}</h1>
                 <p className="text-sm text-gray-400 mt-1">{MODERN_ADMIN_PANEL}</p>
                </div>
                

                 {/* list of pages */}
                 <div className="p-0 flex flex-col gap-4 w-[200px] ">
                    {/* item */} 
                     {navigation.map((item,index)=>{
                        return <div key={index} className="flex flex-row justify-start gap-4">
                        <NavLink to={item.link} 
                         style={({ isActive }) => ({
                              backgroundColor: isActive ? "oklch(70.5% 0.213 47.604)" : "white",
                              })}
                        className="min-h-lh w-1 rounded-r-full py-1.5"><p className="opacity-0">|</p></NavLink>
                         <NavLink to={item.link}  className="flex flex-row items-center  justify-start gap-2 p-1.5 rounded-md w-[150px] ">
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                         </NavLink>
                    </div>
                     })}
                     
                    
                 </div>
            </div>
             {children}
          </div>
        </>
    )
}