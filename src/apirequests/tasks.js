const addTask = async({taskName,taskDescription,dueDate,project,tags})=>{

    console.log(taskName,taskDescription,dueDate,project,tags)
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:8000/api/v1/tasks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            body:JSON.stringify({taskName,taskDescription,dueDate,project,tags}),
            credentials: "include",
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
}

const updateTask = async(taskId)=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:8000/api/v1/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            credentials: "include",
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
}

const getAllTasks = async()=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:8000/api/v1/tasks/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            credentials: "include",
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
}

export  {addTask,updateTask,getAllTasks}