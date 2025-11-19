import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  // Close drawer when navigating to a new route
  useEffect(() => {
    setNavDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer automatically at desktop widths (md: ≥768px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setNavDrawerOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    onResize(); // run once on mount to ensure correct initial state
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-7 px-9 '>
        <div>
          <Link to='/' className="text-2xl font-bold"> Tunde Taiwo Okunola <span className='text-sm text-blue-300'>Esq.</span></Link>
        </div>
        <div className='hidden md:flex space-x-6'>
          <NavLink to='/' end className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>Home</NavLink>
          <NavLink to='/about' className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>About</NavLink>
          <NavLink to='/services' className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>Services</NavLink>
          <NavLink to='/pricing' className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>Pricing</NavLink>
          <NavLink to='/blog' className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>Blog</NavLink>
          <NavLink to='/contact' className={({ isActive }) =>
            `text-gray-700 hover:text-black text-sm font-medium uppercase [&.active]:text-black [&.active]:border-b-2 [&.active]:border-blue-500 ${isActive ? 'active' : ''}`
          }>Contact</NavLink>
        </div>
        <button onClick={toggleNavDrawer} className='md:hidden'>
          <HiBars3BottomRight className='h-6 w-6 text-gray-700 hover:text-black '/>
        </button>
      </nav>

      {/* Backdrop to close by clicking outside (mobile only) */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setNavDrawerOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"} `}>
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className='h-6 w-6 text-gray-600' />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
          <nav className="space-y-4">
            <Link to='/' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Home</Link>
            <Link to='/about' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>About</Link>
            <Link to='/services' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Services</Link>
            <Link to='/pricing' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Pricing</Link>
            <Link to='/blog' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Blog</Link>
            <Link to='/contact' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Contact</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;