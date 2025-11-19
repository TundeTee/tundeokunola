import React from 'react'

const Intro = () => {
  return (
    <div className=" mb-80 lg:mb-0">
    <div className='p-4 bg-blue-400 absolute lg:w-3/4 lg:top-[640px] transform scale-100 hover:scale-50 transition-transform duration-300 ease-in-out rounded-b-lg rounded-t-lg'> 
      <h3 className='text-bold text-center text-4xl'>Introducing Our Law Firm</h3>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse adipisci id perferendis, odio iusto voluptatem voluptate qui commodi veniam, aliquam cumque laborum porro ad ipsam quo veritatis dolorem magni quis fuga aspernatur fugit quasi. Odio dolor voluptatibus iste distinctio neque?
    </p>
    <button className='bg-gray-600 text-white'><a href="/about">Learn More</a></button>
    </div></div>
  )
}

export default Intro
