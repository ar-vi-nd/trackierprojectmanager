import React from 'react'
import { userLogout } from '../../apirequests/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'



const LogoutBtn = ({isOpen}) => {
  const dispatch = useDispatch()

  const handleLogout = async()=>{

  try {
      const response =await userLogout()
      if(response?.success){
        dispatch(logout())
      }
  } catch (error) {
    console.log("error logging out, ",error)
    
  }


  }

  return (

   <button className={`m-1 inline-block px-6 py-2 text-white duration-200 bg-blue-400 hover:bg-red-500 rounded-full`} onClick={handleLogout} >Logout</button>
  )
}

export default LogoutBtn