import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import ATS from '../components/ATS';
import Details from '../components/Details';
import Summary from '../components/Summary';
import type { Resume, Feedback } from '../../types/index';
import { usePuterStore } from '../lib/puter';
import { ArrowLeftIcon } from 'lucide-react';
import Loader from '../components/Loader';
export const meta = () => (
    [
        { title: "Rizzumé | Analysis" },
        { name: "Ai Powered Resume Analyzer", content: "Detailed overview of your resume's performance and suggestions for improvement." },
    ]
)

const resume = () => {
    const { auth, kv, isLoading, fs } = usePuterStore();
    const { id } = useParams<{ id: string }>();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadResume = async () => {
            try {
                console.log('Loading resume with id:', id);
                const resume = await kv.get(`resume:${id}`);
                if (!resume) {
                    console.error('No resume found for id:', id);
                    return;
                }
                
                const resumeData = JSON.parse(resume);
                // Load PDF
                const resumeBlob = await fs.read(resumeData.resumePath);
                if (!resumeBlob) {
                    console.error('Failed to load PDF from path:', resumeData.resumePath);
                    return;
                }
                const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
                const resumeUrl = URL.createObjectURL(pdfBlob);
                setResumeUrl(resumeUrl);
                
                // Load image
                const imageBlob = await fs.read(resumeData.imagePath);
                if (!imageBlob) {
                    console.error('Failed to load image from path:', resumeData.imagePath);
                    return;
                }
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrl);
                
                // Set feedback
                if (!resumeData.feedback) {
                    console.error('No feedback found in resume data');
                    return;
                }
                setFeedback(resumeData.feedback);
            } catch (err) {
                console.error('Error loading resume:', err);
            }
        };
        if (id) {
            loadResume();
        }
    }, [id, kv, fs])
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=resume/${id}`)

    }, [isLoading]);
    return (
        <main className="bg-black text-white min-h-screen">
            <section className="min-h-screen px-4 py-6">
               
                    <div className="mb-6 sm:mb-8 animate-fade-in">
                        <Link to={'/'} className='back-button group inline-flex items-center gap-3'>
                            <ArrowLeftIcon className='w-5 h-5 text-white group-hover:-translate-x-1 transition-transform' />
                            <span className='text-white/90 text-sm font-semibold group-hover:text-white transition-colors'>Back to Home</span>
                        </Link>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                        <section className='lg:w-1/3 flex-shrink-0 animate-fade-in-up animation-delay-200 flex items-center justify-center h-screen max-md:h-fit'>
                            <div className='relative group w-full max-w-md'>
                                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-blue-700/5 rounded-3xl"></div>
                                <div className='relative bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-4 h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden'>
                                    {
                                        imageUrl && resumeUrl ? (
                                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className=" w-full h-full flex items-center justify-center">
                                                <img
                                                    src={imageUrl}
                                                    title="resume"
                                                    className='max-w-full max-h-full object-contain rounded-2xl'
                                                />
                                            </a>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-20">
                                                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                                                <p className='text-white/70'>Loading resume...</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </section>

                        <section className='lg:flex-1 animate-fade-in-up animation-delay-400'>
                            <div className="relative group h-full">
                                <div className="absolute -inset-1 bg-neutral-950 rounded-3xl"></div>
                                <div className='relative bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 h-full overflow-hidden flex flex-col'>
                                    <div className="flex-shrink-0 mb-6">
                                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white pb-2 border-b border-white/10'>
                                            <span className='bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'>
                                                Resume Review
                                            </span>
                                        </h2>
                                        <p className='text-sm text-white/60 mt-2'>
                                            Comprehensive AI-powered analysis
                                        </p>
                                    </div>

                                    <div className='flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6'>
                                        {
                                            feedback ? (
                                                <>
                                                    <Summary feedback={feedback} />
                                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                                    <Details feedback={feedback} />
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20">
                                                    <Loader text='Loading'/>
                                                    <p className='text-white/70 text-center'>Analyzing your resume...</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            </section>
        </main>
    )
}

export default resume