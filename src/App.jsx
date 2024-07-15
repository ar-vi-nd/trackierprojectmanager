import { useState } from 'react'
import './App.css'
import { Header,Footer } from './components'
import {Outlet} from "react-router-dom"



function App() {

  return <div className='min-h-screen text-center flex-wrap bg-rose-100'> 
  <Header></Header>
   <main>
    <Outlet/>
  </main>
<Footer></Footer>

  </div>
  }
  
  export default App
  

