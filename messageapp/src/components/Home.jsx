import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='grid grid-cols-2 h-screen bg-slate-400'>      
    <div className='m-auto'>
         Login as a Teacher <br />
         <Link to='/teacher'>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           Teacher
         </button>
         </Link>
    </div>                  
    <div className='m-auto'>
         Login as a Parent <br />
         <Link to='/parent'>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           Parent
         </button>
         </Link>
    </div>
 </div>

  )
}

export default Home
