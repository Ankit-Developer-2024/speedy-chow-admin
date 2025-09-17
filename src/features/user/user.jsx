import { CiSearch } from "react-icons/ci";
import { USERS } from "../../app/strings/appStrings"; 
import burgerImg  from "../../assets/burger.jpeg"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, fetchAllUserAsync, loading } from "./userSlice";
import { getCaptilizeFirstLatter, getFormatedDate } from "../../utils/utility";

export default function User(){
 
    const dispatch = useDispatch();
    const isLoading = useSelector(loading)
    const users = useSelector(data);

    useEffect(()=>{
       if(users.length === 0){
          dispatch(fetchAllUserAsync());
       } 
       
    },[dispatch,users])

    return (
           <>
             <div className="px-5 py-3 w-full ">
                  <h1 className="text-3xl font-bold">{USERS}</h1>
                  <p className="text-sm text-gray-400">Hi, Ankit. Welcome back to Sppedy Chow Admin panel</p> 
                   <br />

                        <div className="flex flex-row items-center justify-between bg-white rounded-sm pr-2 w-sm">
                          <input
                          type="text" 
                          className="bg-white rounded-sm  outline-0 px-2 py-1"
                          placeholder="Search..."
                          />
                          <CiSearch className="" />
                        </div>
        
                        <br />
                                     
                          {/* items */}

                        <div className=" w-full ">

                         <table className="table-fixed border-collapse  w-full">
                             <thead className="bg-slate-600 text-white w-full">
                               <tr className=" place-content-start  items-start">
                                <th className="w-7"> <input type="checkbox" /> </th>
                                <th className="font-medium text-start py-1">Full Name</th>
                                <th className="font-medium text-start">Email</th>
                                <th className="font-medium text-start">Status</th>
                                <th className="font-medium text-start">Role</th>
                                <th className="font-medium text-start">Joined Date</th>
                                <th className="font-medium text-start ">Action</th> 
                               </tr>
                             </thead>
                             
                             <tbody className="text-gray-600">
                               {
                                users.map((user,index)=>{
                                  return  <tr key={user.id} className={index%2===0 ? "border-b border-blue-100 bg-white" : "border-b border-blue-100 bg-blue-50"}>
                                    <td className="text-center">
                                        <input className="" type="checkbox" />
                                    </td>
                                    <td className="flex  gap-2 py-2">
                                        <img className="w-6 h-6 rounded-full" src={burgerImg} alt="img" />
                                        <p>{getCaptilizeFirstLatter(user.name)}</p>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <span className={user.status =='Active' ?  "bg-green-500 text-white rounded-2xl px-2 py-0.5"  : "bg-red-600 text-white rounded-2xl px-2 py-0.5"}>{user.status}</span>
                                    </td>
                                    <td>
                                        <span>{getCaptilizeFirstLatter(user.role)}</span>
                                    </td>
                                    <td >
                                       {getFormatedDate(user.joinedAt)}
                                    </td>
                                    <td className="items-start text-center ">
                                         <div className="flex gap-3">
                                                <FiEdit/>
                                        <RiDeleteBin5Fill className="text-red-500 " />
                                   
                                         </div>
                                     </td>
                                </tr>
                                })
                               }
                             </tbody>

                          </table>  
 

                        </div>  
                         
                         
             
            </div>
          </>
    );
}