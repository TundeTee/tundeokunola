import React from 'react'

const FeaturedSection = () => {
  return (
    <section className='py-16 px-4 bg-white relative top-20'>
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 text-center ">
    <div className="flex flex-col items-center bg-gray-300 h-full w-full pb-5">
        <h1 className='font-bold text-2xl italic p-2'>01.</h1>
    <h3 className='font-semibold'>Criminal Law</h3>
    <p className='text-justify p-3'>Criminal law is the body of law that deals with crime and its punishment. A crime is any act or omission that violates a law forbidding or commanding it. Criminal law differs from civil law, which deals with disputes between individuals or organizations. Criminal law is concerned with offenses against the state or society as a whole.</p>
    <button className='bg-blue-300 px-4 rounded-md underline '><a href="/services">Learn More</a></button>
    </div>

    <div className="flex flex-col items-center bg-gray-300 h-full w-full pb-5">
    <h1 className='font-bold text-2xl italic p-2'>02.</h1>
    <h3 className='font-semibold'>labor Law</h3>
    <p className='text-justify p-3'>Labor law, also known as employment law, governs the relationship between employers and employees. It covers a wide range of topics, including wages and hours, working conditions, and the right to organize and bargain collectively. The primary goal of labor law is to protect the rights of workers and promote fair and safe working conditions.</p>
    <button className='bg-blue-300 px-4 rounded-md underline '><a href="/services">Learn More</a></button>
    </div>

     <div className="flex flex-col items-center bg-gray-300 h-full w-full pb-5">
    <h1 className='font-bold text-2xl italic p-2'>03.</h1>
    <h3 className='font-semibold'>Police Custody</h3>
    <p className='text-justify p-3'>Police law, also known as law enforcement law, is the body of law that governs the activities of police officers and other law enforcement agencies. It encompasses a wide range of legal principles and rules that regulate how police officers conduct their duties, ensuring that they act within the bounds of the law while maintaining public safety and order. The primary goals of police law are to protect the rights of individuals, prevent abuse of power, and promote effective law enforcement.</p>
    <button className='bg-blue-300 px-4 rounded-md underline'><a href="/services">Learn More</a></button>
    </div>

    <div className="flex flex-col items-center bg-gray-300 h-full w-full pb-5">
    <h1 className='font-bold text-2xl italic p-2'>04.</h1>
    <h3 className='font-semibold'>Social Right</h3>
    <p className='text-justify p-3'>Social rights are a set of entitlements and freedoms that aim to ensure a basic standard of living and equal opportunities for all individuals within a society. These rights are considered essential for human dignity and well-being and are often enshrined in national constitutions and international human rights treaties. Unlike civil and political rights, which primarily protect individuals from state interference, social rights require active measures by the state to ensure their fulfillment.</p>
    <button className='bg-blue-300 px-4 rounded-md underline'><a href="/services">Learn More</a></button>
    </div>
    
    </div>
    </section>
  )
}

export default FeaturedSection
