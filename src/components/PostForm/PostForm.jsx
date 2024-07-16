import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button} from "../index"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux' 
import { useEffect } from 'react'
import { addProject } from '../../apirequests/projects';

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
            console.log(data)
            const response = await addProject(data)
            console.log(response)


        } catch (error) {
            
            console.log("Error Creating Project ", error)
        }
    }

    const validationErrorHandler = (error)=>{
        // console.log("Validation errors : ",error ," form values : ",getValues())
        setError({...error})
    }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler,validationErrorHandler)} className='flex flex-wrap'>
        
        <div>
            <Input
            label = "Project Name"
            placeholder = "Enter Project Name"
            className = "mb-4"
            {...register('projectName',{required:{value:true,message:"Project Name required"}})}
            
            />
            <div className='bg-red-500 color-white'>{error&&error.projectName?.message}</div>
            <Input
            label = "Project Description"
            placeholder = "Enter Project Description"
            className = "mb-4"
            {...register('projectDescription',{required:{value:true,message:"Project Description required"}})}
            
            />
            <div className='bg-red-500 color-white'>{error&&error.projectDescription?.message}</div>



            <div className='w-1/3 px-2'>
            <Button type="submit" bgColor={project ? "bg-green-500" : undefined} className="w-full" disabled={isSubmitting}>
                    {project ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
    </form>
  )
}

export default PostForm