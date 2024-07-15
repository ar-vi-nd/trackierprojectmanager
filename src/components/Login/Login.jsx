import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import {Link, useNavigate } from 'react-router-dom'
import {Logo,Input} from '../index'
import Button from '../Button/Button'

import {useForm} from 'react-hook-form'









const Login = () => {

    const [error,setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit,formState} = useForm()

    const {isSubmitting,isSubmitted,isSubmitSuccessful} = formState

    // console.log(isSubmitting,isSubmitted,isSubmitSuccessful)


    const formSubmitHandler = async(body)=>{
        try {

            // console.log("inside form submit handler")
            setError(null)
            const session = await authService.userLogin(body)
            if(session){
                const userData = await authService.getCurrentUser()
                // console.log(userData)
                if(userData){
                    console.log("here")
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            console.log("Error submitting form ",error)
            setError(error)
        }
    }

    const validationErrorHandler = (error)=>{
        console.log(error)
        setError(error)
    }

    const handleOAuthLogin = ()=>{
        try {
         authService.oAuthLogin()
        } catch (error) {
            console.log("error logging using oAuth ",error)
        }
    }


    return (
        <div  className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"></Logo>
                    </span>
                </div>
    
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
    
            <form onSubmit={handleSubmit(formSubmitHandler,validationErrorHandler)} className='mt-8'>
                
            <div className='min-h-8 mt-5'>
            {error?.message && <p className="text-red-600 text-center ">{error.message}</p>}

            </div>


                <div className='space-y-5'>
                    <Input
                    label = "Email : "
                    placeholder = "Enter Your Email"
                    type = "Email"
                    {...register("email",{
                        required:{
                            value:true,
                            message:"Email Required"
                        },
                        validate:{
                            matchPattern : (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid  address"
                        }
                    })}
                    />

                    <div className=' text-red-500 min-h-8'>
                        {error&&error.email?.message}
                    </div>
    
                    <Input
                    label = "Password : "
                    type = "password"
                    placeholder = "Enter your password"
                    {...register("password",{
                        required : {
                            value: true,
                            message: "Password Required"
                        }
                        
                    })}
                    />

                    <div className=' text-red-500 min-h-8'>
                        {error&&error.password?.message}
                    </div>
    
                    <Button type='submit' className={`w-full ${isSubmitting?"bg-blue-300":"bg-blue-500"}`}  textColor='text-white' disabled={isSubmitting}> Sign In</Button>
                </div>
            </form>
            
                    <Button type='button' className='w-full mt-2 bg-white' textColor='text-black' disabled={isSubmitting} onClick={handleOAuthLogin}> Sign In With Google</Button>
            </div>
        </div>
      )
}

export default Login