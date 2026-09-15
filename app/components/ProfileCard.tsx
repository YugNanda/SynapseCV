import { usePuterStore } from '../lib/puter';
import { SquareUserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
const ProfileCard = () => {
    const { auth } = usePuterStore();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = auth.getUser();
        if (user) {
            setUsername(user.username);
        }
    }, [auth]);

    return (
        <div
            className="relative drop-shadow-xl w-90 h-120 overflow-hidden rounded-xl bg-[#000]"
        >
            <div
                className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#000]"
            >
               <div className="rounded-full flex flex-col items-center justify-center">
                 <div className='w-70 h-78 mb-8'>
                    <SquareUserRound className='w-full h-full' />
                 </div>
                 <div className='text-center mt-8'>
                    <h3 className='text-2xl font-bold text-white mt-4'>#{username}</h3>
                 </div>
               </div>
                
            </div>
            <div className="absolute w-110 h-110 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
            <div className="absolute w-50 h-50 bg-white blur-[50px] left-1/2 top-1/2"></div>

        </div>

    )
}

export default ProfileCard