import { useEffect, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import Router from './utils/router'
 


function App() {
  const [count, setCount] = useState(0)


  return (
    <> 
      <RouterProvider router={Router}>
        
       </RouterProvider>
     
    </>
  )
}

export default App
