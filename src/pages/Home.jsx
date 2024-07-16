import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
import {Container} from '../components'
import { getAllProjects } from '../apirequests/projects'
import {PostCard} from '../components'


function Home() {
    const [projects, setProjects] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        // appwriteService.getPosts().then((posts) => {
        //     if (posts) {
        //         setPosts(posts.documents)
        //         setLoading(false)
        //     }
        // })

        getAllProjects().then((data)=>{
            // console.log(data?.data)
            setProjects(data?.data)
            if(data?.success){
                setLoading(false)
            }
        })

     
    },[])


    if(loading){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-100">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  
    else if (projects?.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-100">
                                No Projects Yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div  className='w-full min-h-96 py-8 '>
            <Container>
                <div className='w-auto flex flex-wrap justify-evenly'>
                    {projects.map((project) => (
                        <div key={project._id} className='p-2 w-1/4 min-w-96'>
                            <PostCard {...project} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home