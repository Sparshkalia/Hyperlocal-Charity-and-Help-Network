'use client';
import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
function Usericon() {
    const router=useRouter()
    const HandleSubmit=(e)=>{
        e.preventDefault()
        router.push('/profile')
    }
    return (
        <div>
        <button className='absolute top-0 right-0 border p-1 m-4 bg-gray-300 text-black rounded-full' onClick={HandleSubmit}><CgProfile size={30} /></button>
        </div>
    )
}

export default Usericon
