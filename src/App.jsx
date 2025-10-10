import { useEffect } from 'react'
import './App.css'
import { RouterProvider, } from 'react-router'
import Router from './utils/router'
import { useDispatch } from 'react-redux'
import { checkAsync, } from './features/auth/authSlice'
 


function App() {
  const dispatch = useDispatch() 

  useEffect(()=>{ 
     if(window.location.pathname!=='/signup' || window.location.pathname!=='/login'){
       dispatch(checkAsync())
     }
  },[dispatch]) 
 
  return (
    <>  
       <RouterProvider router={Router}>
        
       </RouterProvider>
     
    </>
  )
}

export default App
