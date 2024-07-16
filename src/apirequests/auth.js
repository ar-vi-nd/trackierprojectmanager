const userSignup = async({email,password,name})=>{
    try {
        console.log(email,password,name)
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/signup`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:email,password:password,fullName:name})
          });

          const jsondata = await response.json()

          console.log(jsondata)
          return jsondata
        
    } catch (error) {

        console.log("error signing up, ",error)
        
    }
}

const userLogin = async({email,password})=>{
  try {
      console.log(email,password)
      const response = await fetch(`http://127.0.0.1:8000/api/v1/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({email:email,password:password}),
          credentials: "include",
        });
        const jsondata = await response.json()
        console.log(jsondata)
        return jsondata
  } catch (error) {
    console.log("error logging in ",error)
  }

}

const userLogout = async () => {
    try {
        let token = localStorage.getItem('token')
      const response = await fetch(`http://127.0.0.1:8000/api/v1/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        credentials: "include", // Ensure credentials are included
      });
      
      if (response.ok) {
        const jsondata =await response.json()
        console.log("Logout successful");
        localStorage.removeItem("token")
        localStorage.removeItem("myState")
        return jsondata
      } else {
        console.log("Logout failed", response.statusText);
      }
    } catch (error) {
      console.log("Error logging out ", error);
    }
  };
  

export {userSignup,userLogin,userLogout}