"use client"




import { Html } from '@react-three/drei';


 const Loader = () => {
     return (
      <Html className="">  
        <div className='flex justify-center items-center'>
            <div className='w-20 h-20 border-4 border-t-blue-500 rounded-full animate-spin'>
            </div>
        </div>
      </Html>
  )
 }

export default Loader;
