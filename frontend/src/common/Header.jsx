
import React, { useState } from 'react'
import Navbar from './Navbar'
import ComplaintChat from './ComplaintChat'

const Header = () => {
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  return (
    <>
      <header className='bg-white sticky top-0 shadow-gray-300 shadow-md z-50'>
        <Navbar onOpenComplaint={() => setIsComplaintOpen(true)} />
      </header>
      {isComplaintOpen && <ComplaintChat onClose={() => setIsComplaintOpen(false)} />}
    </>
  )
}

export default Header
