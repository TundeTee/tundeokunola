
import heroImg from "../assets/law-firm.webp"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt="law-firm" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
    <div className="absolute inset-0 bg-opacity-5 bg-black flex items-center justify-center">
        <div className="text-center text-white p-6">
             <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase md-4'> Founded in 2020</h1>
            <p className='text-4xl tracking-tighter md:text-lg mb-6'>
Tunde Taiwo Okunola Specializes in labor Law</p>
            <Link to="/about" className='bg-white text-gray-950 text-lg px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition'>Learn More</Link>
        </div>
    </div>
    </section>
  )
}

export default Hero
