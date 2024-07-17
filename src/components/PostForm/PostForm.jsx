import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button} from "../index"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux' 
import { useEffect } from 'react'
import { addProject, updateProject } from '../../apirequests/projects';

// let rerenderval = 0;

const PostForm = ({project}) => {

    const [error,setError] = useState(null)

    const {register,handleSubmit,watch,setValue,control,getValues,formState} = useForm({
        defaultValues:{
            projectName : project?.projectName||"",
            projectDescription : project?.projectDescription || ""
        }
    })

    const {isSubmitting} = formState

    const navigate = useNavigate()

    const formSubmitHandler = async (data)=>{
        try {
            setError(null)
            // console.log(data)
            if(!project){

              const response = await addProject(data)
              console.log(response)
              if(response?.success){
                navigate("/")

              }else{
                throw response
              }
            }
            else{
              const response = await updateProject({...data,id:project?._id})
              console.log(response)
              if(response?.success){
                navigate("/")

              }else{
                throw response
              }
            }


        } catch (error) {
            
            console.log("Error Creating Project ", error)
            setError(error)
        }
    }

    const validationErrorHandler = (error)=>{
        // console.log("Validation errors : ",error ," form values : ",getValues())
        setError({...error})
    }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler,validationErrorHandler)} className='flex flex-wrap'>
        
        <div>

        <div className='min-h-8 mt-5'>
            {error?.errmessage && <p className="text-red-600 text-center ">{error.errmessage}</p>}

            </div>
            <Input
            label = "Project Name"
            placeholder = "Enter Project Name"
            className = "mb-4"
            {...register('projectName',{required:{value:true,message:"Project Name required"},validate: {
              noLeadingTrailingWhitespace: (value) => value.trim().length ===value.length || "Project Name cannot have only leading or trailing white spaces"
          }})}
            
            />
            <div className=' text-red-500 h-6'>{error&&error.projectName?.message}</div>
            <Input
            label = "Project Description"
            placeholder = "Enter Project Description"
            className = "mb-4"
            {...register('projectDescription',{required:{value:true,message:"Project Description required"},validate: {
              noLeadingTrailingWhitespace: (value) => value.trim().length ===value.length || "Project Description cannot have only leading or trailing white spaces"
          }})}
            
            />
            <div className=' text-red-500 h-6'>{error&&error.projectDescription?.message}</div>



            <div className='w-1/3 px-2 mt-2'>
            <Button type="submit" bgColor={project ? "bg-green-500" : undefined} className="w-full" disabled={isSubmitting}>
                    {project ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
    </form>
  )
}

export default PostForm