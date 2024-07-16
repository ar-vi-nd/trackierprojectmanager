const getAllProjects = async()=>{

    try {
        let token = localStorage.getItem('token')
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        credentials: "include",
      });
      
      if (response.ok) {
        const jsondata =await response.json()
        return jsondata
      } else {
        throw response
      }
    } catch (error) {
      console.log("Error Fetching Projects ", error);
    }

}

const addProject = async({projectName,projectDescription})=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:8000/api/v1/projects`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            body:JSON.stringify({projectName,projectDescription}),
            credentials: "include",
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error logging in ",error)
    }
  
  }

export {getAllProjects,addProject}