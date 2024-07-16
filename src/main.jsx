import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { AuthLayout} from './components/index.js'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import AllTasks from './pages/AllTasks.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
          <AuthLayout authentication>
            <Home/>
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        ),
    },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
      },
      {
        path: "/newproject",
        element: (
            <AuthLayout authentication >
                <AddPost/>
            </AuthLayout>
        ),
      },
      {
        path: "/project/:slug",
        element: (
            <AuthLayout authentication >
                <Post/>
            </AuthLayout>
        ),
      },
      {
        path: "/editproject/:slug",
        element: (
            <AuthLayout authentication >
                <EditPost/>
            </AuthLayout>
        ),
      },
      {
        path: "/taskboard",
        element: (
            <AuthLayout authentication >
                <AllTasks/>
            </AuthLayout>
        ),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
</Provider>
)
