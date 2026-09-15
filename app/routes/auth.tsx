import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '../lib/puter'
export const meta = () => (
    [
        { title: "Rizzumé | Auth" },
        { name: "Ai Powered Resume Analyzer", content: "Log into your account to access the AI-powered resume analyzer." },
    ]
)
const auth = () => {

    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1]
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.isAuthenticated) navigate(next)
        }, [auth.isAuthenticated]);
    return (
        <main className="bg-[url('/images/authBG.jpg')] bg-cover min-h-screen flex items-center justify-center">
            <div className='gradient-border shadow-lg'>
                <section className='flex flex-col gap-8 bg-black rounded-2xl p-10'>
                    <div className='flex flex-col items-center gap-2 text-center justify-center'>
                        <h1>Welcome</h1>
                        <h2>Login and let AI fix what your last resume ruined</h2>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        {isLoading ? (
                            <button className='auth-button animate-pulse'>Signing you in...</button>
                        ) : (<>
                        
                        {auth.isAuthenticated ?
                        (<button className='auth-button' onClick={auth.signOut}>Log Out</button>)
                        :
                        (<button className='auth-button' onClick={auth.signIn}>Login</button>)
                        }
                        </>)}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default auth