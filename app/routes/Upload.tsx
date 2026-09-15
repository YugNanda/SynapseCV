import {type FormEvent, useState, useEffect} from 'react'
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";
import {usePuterStore} from "../lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "../lib/pdf2img";
import {generateUUID} from "../lib/utils";
import {prepareInstructions} from "../../constants";
import type { Resume, Feedback } from "../../types/index";
import Loader from '../components/Loader';

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Check authentication status when component mounts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!auth.isAuthenticated) {
                    console.log('Not authenticated, redirecting to sign in...');
                    await auth.signIn();
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setStatusText('Error: Authentication failed. Please try again.');
            }
        };
        
        if (!isLoading) {
            checkAuth();
        }
    }, [auth, isLoading]);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        if (!auth.isAuthenticated) {
            setStatusText('Error: Please sign in to analyze resumes');
            try {
                await auth.signIn();
                return; // Return after sign-in attempt - user can retry after auth
            } catch (err) {
                console.error('Sign in failed:', err);
                return;
            }
        }
        
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        let uploadedFile;
        try {
            uploadedFile = await fs.upload([file]);
            if (!uploadedFile) {
                setIsProcessing(false);
                return setStatusText('Error: Failed to upload file');
            }
        } catch (err) {
            console.error('File upload failed:', err);
            setIsProcessing(false);
            return setStatusText('Error: File upload failed. Please ensure you are signed in and try again.');
        }

        setStatusText('Converting to image...');
        let imageFile;
        try {
            imageFile = await convertPdfToImage(file);
        } catch (err) {
            console.error('convertPdfToImage threw:', err);
            setIsProcessing(false);
            return setStatusText(`Error: Failed to convert PDF to image: ${String(err)}`);
        }

        if (!imageFile || !imageFile.file) {
            console.error('convertPdfToImage result:', imageFile);
            setIsProcessing(false);
            return setStatusText(`Error: Failed to convert PDF to image${imageFile?.error ? `: ${imageFile.error}` : ''}`);
        }

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data: Resume = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle,
            feedback: {
                overallScore: 0,
                ATS: { score: 0, tips: [] },
                toneAndStyle: { score: 0, tips: [] },
                content: { score: 0, tips: [] },
                structure: { score: 0, tips: [] },
                skills: { score: 0, tips: [] }
            }
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        try {
            console.log('Starting AI analysis...');
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );

            console.log('Raw AI feedback:', feedback);
            
            if (!feedback) {
                setIsProcessing(false);
                return setStatusText('Error: Failed to get AI feedback');
            }

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;
            
            console.log('Feedback text:', feedbackText);

            try {
                const parsedFeedback = JSON.parse(feedbackText);
                const defaultScore = 70; // Default score if not provided
                
                // Ensure proper feedback structure
                const structuredFeedback: Feedback = {
                    overallScore: parsedFeedback.overallScore || defaultScore,
                    ATS: {
                        score: parsedFeedback.ATS?.score || defaultScore,
                        tips: parsedFeedback.ATS?.tips?.map((tip: any) => ({
                            type: tip.type || "improve",
                            tip: tip.tip || ""
                        })) || []
                    },
                    toneAndStyle: {
                        score: parsedFeedback.toneAndStyle?.score || defaultScore,
                        tips: parsedFeedback.toneAndStyle?.tips?.map((tip: any) => ({
                            type: tip.type || "improve",
                            tip: tip.tip || "",
                            explanation: tip.explanation || ""
                        })) || []
                    },
                    content: {
                        score: parsedFeedback.content?.score || defaultScore,
                        tips: parsedFeedback.content?.tips?.map((tip: any) => ({
                            type: tip.type || "improve",
                            tip: tip.tip || "",
                            explanation: tip.explanation || ""
                        })) || []
                    },
                    structure: {
                        score: parsedFeedback.structure?.score || defaultScore,
                        tips: parsedFeedback.structure?.tips?.map((tip: any) => ({
                            type: tip.type || "improve",
                            tip: tip.tip || "",
                            explanation: tip.explanation || ""
                        })) || []
                    },
                    skills: {
                        score: parsedFeedback.skills?.score || defaultScore,
                        tips: parsedFeedback.skills?.tips?.map((tip: any) => ({
                            type: tip.type || "improve",
                            tip: tip.tip || "",
                            explanation: tip.explanation || ""
                        })) || []
                    }
                };
                
                console.log('Structured feedback:', structuredFeedback);
                data.feedback = structuredFeedback;
                await kv.set(`resume:${uuid}`, JSON.stringify(data));
                setStatusText('Analysis complete, redirecting...');
                console.log('Final data stored:', data);
                navigate(`/resume/${uuid}`);
            } catch (parseErr) {
                console.error('Failed to parse AI feedback:', parseErr);
                setIsProcessing(false);
                return setStatusText('Error: Invalid feedback format from AI');
            }
        } catch (err) {
            console.error('AI analysis error:', err);
            setIsProcessing(false);
            return setStatusText('Error: Failed to analyze resume. Please try again.');
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-black text-white min-h-screen">
            <Navbar />

            <section className="min-h-screen px-4 flex flex-col items-center justify-center relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
                    <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Smart feedback for your <span className="text-white">dream job</span>
                        </h1>
                    </div>

                    {isProcessing ? (
                        <div className="animate-slide-up animation-delay-200">
                            <h2 className="text-2xl text-white/70 font-light mb-8 py-2">{statusText}</h2>
                            <Loader text='Processing'/>
                        </div>
                    ) : (
                        <h2 className="text-2xl text-white/70 font-light animate-slide-up animation-delay-200 mb-16 py-2">
                            Drop your resume for an ATS score and improvement tips
                        </h2>
                    )}

                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="w-full max-w-4xl lg:max-w-5xl mx-auto animate-fade-in-up animation-delay-400 flex flex-col items-center">
                            <div className="relative group w-full">
                                <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                                <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 hover:border-white/50 transition-all duration-300">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="form-div">
                                            <label htmlFor="company-name" className="text-lg md:text-xl text-white/70 font-medium mb-3 block">Company Name</label>
                                            <input
                                                type="text"
                                                name="company-name"
                                                placeholder="e.g., Google, Microsoft, StartupCo"
                                                id="company-name"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="form-div">
                                            <label htmlFor="job-title" className="text-lg md:text-xl text-white/70 font-medium mb-3 block">Job Title</label>
                                            <input
                                                type="text"
                                                name="job-title"
                                                placeholder="e.g., Software Engineer, Product Manager"
                                                id="job-title"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-div mt-6">
                                        <label htmlFor="job-description" className="text-lg md:text-xl text-white/70 font-medium mb-3 block">Job Description</label>
                                        <textarea
                                            rows={6}
                                            name="job-description"
                                            placeholder="Paste the job description here to get targeted feedback..."
                                            id="job-description"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="form-div mt-6">
                                        <label htmlFor="uploader" className="text-lg md:text-xl text-white/70 font-medium mb-3 block">Upload Resume</label>
                                        <FileUploader onFileSelect={handleFileSelect} />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex items-center justify-center'>
                                <button
                                className="group relative bg-white text-black font-bold px-12 py-6 rounded-2xl hover:bg-gray-200 transition-all duration-500 text-xl md:text-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 mt-8 animate-scale-in animation-delay-600"
                                type="submit"
                            >
                                <span className="relative z-10">Analyze Resume</span>
                                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload