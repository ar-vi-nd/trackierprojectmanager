import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


// here featured image is actually the url of the image stored in the bucket ie database, so to access that image we made a method "getfilepreview in appwrite service "

const PostCard = ({_id,projectName,projectDescription,projectUser,createdAt}) => {
  const navigate = useNavigate()
  


  return (
    <div className='bg-white rounded-xl p-4 cursor-pointer hover:bg-cyan-300 hover:scale-110 duration-300' onClick={() => { navigate(`/project/${_id}`); }}>
    <div className='max-w-full h-48 flex justify-center mb-4 overflow-hidden'>
      <img src="/projectpic.png" alt={projectName} className='rounded-xl transform transition-transform duration-300 hover:scale-110' />
    </div>
    <h2 className="text-xl font-bold">Title : {projectName}</h2>
    <p>Description : {projectDescription}</p>
    <p>Created By: {projectUser?.fullName?.toUpperCase()}</p>
    <p>Started On : {new Date(createdAt).toLocaleDateString()}</p>
  </div>
  
  )
}

export default PostCard