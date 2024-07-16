const getAllProjects = async()=>{

    try {
        let token = localStorage.getItem('token')
      const response = await fetch(`https://trackier-assignment.vercel.app/api/v1/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }      });
      
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
        const response = await fetch(`https://trackier-assignment.vercel.app/api/v1/projects`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            body:JSON.stringify({projectName,projectDescription}),
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
  
  }

  const updateProject = async({projectName,projectDescription,id})=>{

    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`https://trackier-assignment.vercel.app/api/v1/projects/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({projectName,projectDescription}),
          });
          if(response.ok){
              const jsondata = await response.json()
              console.log(jsondata)
              return jsondata
            }
            else{
                throw response
            }
    } catch (error) {
      console.log("error updating project ",error)
    }
  }

  const getProjectById = async(slug)=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`https://trackier-assignment.vercel.app/api/v1/projects/${slug}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error logging in ",error)
    }


  }

  const deleteProjectById = async(slug)=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`https://trackier-assignment.vercel.app/api/v1/projects/${slug}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error logging in ",error)
    }
  }

export {getAllProjects,addProject,getProjectById,updateProject,deleteProjectById}