import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import { deleteProjectById, getProjectById } from "../apirequests/projects";

export default function Post() {
    const [project, setProject] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {

        getProjectById(slug)
        .then((data)=>{
            console.log(data)
            setProject(data?.data)
        })
        .catch((error)=>{console.log(error)})

        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if(slug){
            deleteProjectById(slug).then((data)=>{
                console.log(data)
                if(data?.success){
                    navigate('/')
                }
            })
            .catch((error)=>{console.log(error)})
        }
    };

    return project ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                
                        <div className="absolute right-6 top-6">
                            <Link to={`/editproject/${project._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{project?.projectName}</h1>
                </div>
                <div className="browser-css">
                    {project?.projectDescription}
                    </div>

                <div> Author : {project?.projectUser?.fullName}</div>

                <>
                    {
                        project.taskList.map((task)=>(task?._id))
                    }
                </>
            </Container>
        </div>
    ) : null;
}