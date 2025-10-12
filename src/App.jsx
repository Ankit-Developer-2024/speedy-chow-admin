import { useEffect, useState } from 'react'
import './App.css'
import { RouterProvider, } from 'react-router'
import Router from './utils/router'
import { useDispatch } from 'react-redux'
import { checkAsync, } from './features/auth/authSlice'
 

function App() {

  const dispatch = useDispatch() 
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isSmallScreen);
  
  useEffect(()=>{ 
     if(window.location.pathname!=='/signup' || window.location.pathname!=='/login'){
       dispatch(checkAsync())
     }
  },[dispatch]) 
 
  return (
    <>  
      {
         isSmallScreen 
         ?  <div className=' w-svw h-svh bg-orange-400 flex flex-col gap-3 justify-center items-center'>
         
            <h1 className='text-white text-4xl text-center font-bold'>Optimized Viewing Experience Recommended</h1>
            <p className='text-white text-md text-center font-medium'>If your screen width is less than 1000 pixels, the experience is limited. Please open the website on a desktop or a tablet with a screen width greater than or equal to 1000 pixels for the best experience.</p>
          
         </div>
          :
        <RouterProvider router={Router}>
        
       </RouterProvider>
      }
       
     
    </>
  )
}

export default App
