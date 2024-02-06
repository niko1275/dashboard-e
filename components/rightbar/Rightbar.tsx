import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";


const Rightbar = () =>{
    return (
        <div className=' bg-slate-800 text-white p-5'>
    <div className=''>
      <div className=''>
        
      </div>
      <div className=''>
        <span className='font-bold'>🔥 Disponible ahora</span>
        <h3 className='text-xl mt-5 mb-5 font-bold'> 
          ¿Cómo utilizar la nueva versión del panel de administración?
        </h3>
        <span className='font-bold'>Toma 4 minutos para aprender.</span>
        <p className='mt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit eius libero perspiciatis recusandae possimus.
        </p>
        <button className='flex mt-5 bg-purple-900 rounded p-2'>
          <MdPlayCircleFilled  className="mt-1 mr-3"/>
          ver
        </button>
      </div>
    </div>

  </div>
    )
}

export default Rightbar