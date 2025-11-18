import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import ComplaintChat from '../common/ComplaintChat'
import { useState } from 'react'

const UserLayout = () => {
const [openComplaint, setOpenComplaint] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
     <Footer/>   

        <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpenComplaint(true)}
          className="bg-blue-300 hover:bg-blue-400 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-500"
          aria-label="Open complaint chat"
        >
          {/* Chat bubble icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      {openComplaint && <ComplaintChat onClose={() => setOpenComplaint(false)} />}  
    </>
  )
}

export default UserLayout
