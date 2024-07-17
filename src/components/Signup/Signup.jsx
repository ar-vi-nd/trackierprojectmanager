import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import {Link, useNavigate } from 'react-router-dom'
import {Logo,Button,Input} from "../index"
import {useForm} from 'react-hook-form'
import { userSignup } from '../../apirequests/auth'



const Signup = () => {

    const [error , setError] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {register,handleSubmit ,formState} = useForm()

    const {isSubmitting} = formState


    const formSubmitHandler = async(data)=>{
        setError(null)
        try {
            // console.log(data)
            const response = await userSignup(data)
            console.log(response)
            if(response.success){
                navigate("/login")
            }else{
                throw response
            }
            
        } catch (error) {
            console.log("Error submitting form to create user ,",error.message)
            setError(error)
        }
    }

    const validationErrorHandler = (error)=>{
        console.log(error)
        setError(error)
    }


  return (

    <div className="flex items-center justify-center">

        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            
            <form onSubmit={handleSubmit(formSubmitHandler,validationErrorHandler)} noValidate>

                <div className='space-y-5'>

                <div className='min-h-8 mt-5'>
            {error?.errmessage && <p className="text-red-600 text-center ">{error.errmessage}</p>}

            </div>

                    <Input label = "Full Name :" placeholder = "Enter full name" {...register("name",{
                        required : {
                            value:true,
                            message: "Full Name cannot be empty"
                        },
                        minLength: {
                            value: 3,
                            message: "Full Name must be at least 3 characters"
                        },
                        validate: {
                            noLeadingTrailingWhitespace: (value) => value.trim().length ===value.length || "Full Name cannot have only leading or trailing white spaces"
                        }
                    })}>
                    </Input>

                    
                    <div className=' text-red-500 min-h-8'>
                        {error&&error.name?.message}
                    </div>

                    <Input label = "Email : " type= "email" placeholder = "Enter your email" {...register("email",{
                        required : {
                            value:true,
                            message: "Email cannot be empty"
                        },
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}>
                    </Input>

                    <div className=' text-red-500 min-h-8'>
                        {error&&error.email?.message}
                    </div>

                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password cannot be empty"
                            },
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            validate: {
                                noWhiteSpace: (value) => !/\s/.test(value) || "Password cannot contain white spaces"
                            }
                        })}
                        />

                    <div className=' text-red-500 min-h-8'>
                        {error&&error.password?.message}
                    </div>

                         <Button type="submit" className={`w-full ${isSubmitting?"bg-blue-300":"bg-blue-500"}`}   disabled={isSubmitting}>
                            Create Account
                        </Button>

                </div>


            </form>

        </div>
    </div>
    
  )
}

export default Signup