import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, TaskBoard } from "../components";
import { useSelector } from "react-redux";
import { deleteProjectById, getProjectById } from "../apirequests/projects";
import {TaskForm} from "../components";
import { addTask, updateTask } from "../apirequests/tasks";

export default function Post() {
    const [project, setProject] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [forcedUpdate , setForcedUpdate] = useState(true)
    const [error,setError] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [tasks,setTasks]=useState({})

    const handleAddNewTask = () => {
        setIsFormOpen(true);
      };
    
    const handleCloseForm = () => {
        setIsFormOpen(false);
      };

    const handleSaveTask = (newTask) => {

        console.log(newTask)
        addTask({...newTask,project:slug}).then((data)=>{
            console.log(data)
            if(data.success){
                setForcedUpdate((prev)=>!prev)
            }
            else{
                throw data
            }
            
        }).catch((err)=>{
            console.log(err)
            setError(err)
        })

      };

    const handleUpdateTask = async(taskId)=>{
        updateTask(taskId).then((data)=>{
            console.log(data)
            if(data.success){
                setForcedUpdate((prev)=>!prev)
            }
            else{
                throw data
            }
            
        }).catch((error)=>{
            setError(error)
        })
    }


    useEffect(() => {
        if (slug) {

        getProjectById(slug)
        .then((data)=>{
            console.log(data)
            setProject(data?.data)
            const taskObj = {
                backlog : data?.data?.taskList.filter((task)=>(task.taskStatus === "Backlog")),
                inDiscussion : data?.data?.taskList.filter((task)=>(task.taskStatus ==="In Discussion")),
                inProgress : data?.data?.taskList.filter((task)=>(task.taskStatus ==="In Progress")),
                done : data?.data?.taskList.filter((task)=>(task.taskStatus ==="Done"))
            }
            // console.log(taskObj)
            setTasks(taskObj)
        })
        .catch((error)=>{console.log(error)})

        } else navigate("/");
    }, [slug, navigate,forcedUpdate]);

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
                    <h1 className="text-2xl font-bold">Project Name : {project?.projectName}</h1>
                </div>
                <div className=" text-2xl mb-6">
                    Project Description : {project?.projectDescription}
                    </div>

                <div className=" text-2xl mb-6"> <h1 className="text-2xl font-bold"> Project Manager : {project?.projectUser?.fullName}</h1></div>
                <div className="text-2xl mb-6">Created On : {new Date(project?.projectUser?.createdAt).toLocaleDateString()}</div>


            </Container>

            <div className="container mx-auto p-4 bg-pink-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Task Board</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAddNewTask}
            >
              Add New Task
            </button>
          </div>

          <div className='min-h-8 mt-5'>
            {error?.errmessage && <p className="text-red-600 text-center ">{error.errmessage}</p>}

            </div>
                <TaskBoard tasks={tasks} handleUpdateTask={handleUpdateTask}/>
            {isFormOpen && <TaskForm onClose={handleCloseForm} onSave={handleSaveTask} />}

        </div>

        </div>
    ) : null;
}