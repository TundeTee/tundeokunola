import React from 'react'
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
   <footer className='bg-blue-300 -mt-10 text-center p-6'>
    <h1 className='pb-3'>Tunde Taiwo Okunola <span>Esq.</span></h1>
    © 2025 by Template. Powered and secured by $$
<p>No. 17, Obiesan Office Complex, Beside B.K Petroleum,Orita-Aperin, Omowunmi/Olorunsogo Road, Ibadan, Oyo State of Nigeria</p>
<p>Tel: 08065353147</p>
<p>Email: Otundetaiwo@yahoo.com</p>

 <div className="w-full text-center">
        <CiFacebook className="inline-block h-4 w-4" />
      </div>
   </footer>
   
  )
}

export default Footer
