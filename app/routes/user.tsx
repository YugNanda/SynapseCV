import { usePuterStore } from '../lib/puter'
import ProfileCard from '../components/ProfileCard'
import { Link } from 'react-router'
import { ArrowBigLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ResumeCard from '../components/ResumeCard';
import Loader from '../components/Loader';
import type { Resume, KVItem } from '../../types/index';
const user = () => {
    const { auth, kv } = usePuterStore();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated]);
    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];
            const parsedResumes = resumes?.map((resume) =>
                JSON.parse(resume.value) as Resume
            );

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        };

        loadResumes();
    }, []);
    return (
        <div className='bg-black flex flex-col w-full min-h-screen gap-4 p-4'>
            <nav className='resume-nav'>
                <Link to={'/'} className='back-button py-2'>
                    <ArrowBigLeft className='w-5 h-5 text-white' />
                    <span className='text-white text-sm font-semibold'>Back to Dashboard</span>
                </Link>
                <button
                    className='text-white text-sm font-semibold border-2 border-white px-4 py-2 rounded-md cursor-pointer'
                    onClick={() => auth.signOut}
                >Logout</button>

            </nav>
            <div className='flex flex-col lg:flex-row items-start justify-between w-full gap-8'>
                <div className='flex flex-col gap-2 justify-start items-center w-full lg:w-1/3 lg:border-r-2 border-gray-400/20 py-6'>
                    <h3 className='text-3xl font-semibold text-white mb-8 p-2'>User Profile :</h3>
                    <ProfileCard />
                </div>
                <div className='flex flex-col bg-black w-full lg:w-2/3 gap-10 px-4'>
                    <h3 className='text-3xl text-white font-semibold text-center lg:text-left'>Your Resumes :</h3>
                    <div>
                        {!loadingResumes && resumes?.length === 0 && (
                            <p>No resumes found. Upload your first resume to get feedback.</p>
                        )}
                        {loadingResumes && (
                            <div className="flex flex-col items-center justify-center">
                             <Loader text='Fetching'/>
                            </div>
                        )}
                        {!loadingResumes && resumes.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
                                {resumes.map((resume) => (
                                    <ResumeCard key={resume.id} resume={resume} />
                                ))}
                            </div>
                        )}
                        {!loadingResumes && resumes?.length === 0 && (
                            <div className="flex flex-col items-center justify-center mt-10 gap-4">
                                <Link
                                    to="/upload"
                                    className="primary-button w-fit text-xl font-semibold"
                                >
                                    Upload Resume
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='w-full h-5 flex justify-center items-center mt-8 mb-4 bottom-2'>
                <p className='text-gray-400 text-sm '>Made with &hearts; by <a href="https://github.com/yugnanda">Yug Nanda</a> </p>
            </div>
        </div>
    )
}

export default user