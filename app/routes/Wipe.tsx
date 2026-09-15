import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "../lib/puter";
import Loader from "../components/Loader";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete all files and data? This action cannot be undone.")) {
            await Promise.all(files.map(file => fs.delete(file.path)));
            await kv.flush();
            loadFiles();
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Loader text="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4 p-4 text-center">
                <h2 className="text-2xl font-semibold">An Error Occurred</h2>
                <p className="bg-neutral-900 p-4 rounded-md font-mono">{String(error)}</p>
                <button onClick={clearError} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors">
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto p-8 space-y-8 border border-neutral-800 rounded-lg bg-black">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Wipe Application Data</h1>
                    <p className="text-neutral-400 mt-2">
                        Authenticated as: <span className="font-medium text-white">{auth.user?.username}</span>
                    </p>
                </div>

                <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900/50">
                    <h2 className="text-xl font-semibold mb-4 text-white">Existing Files</h2>
                    {files.length > 0 ? (
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {files.map((file) => (
                                <li key={file.id} className="flex justify-between items-center bg-neutral-800/50 p-2 rounded-md text-sm">
                                    <p className="font-mono text-neutral-300">{file.name}</p>
                                    <p className="text-xs text-neutral-500 hidden sm:block">{file.path}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-neutral-400 text-center py-4">No files found.</p>
                    )}
                </div>

                <div className="text-center p-4 border border-neutral-800 bg-black rounded-lg">
                    <p className="text-neutral-300 mb-4 text-sm">
                        This is a destructive action. All your files and application data will be permanently deleted.
                    </p>
                    <button
                        className="bg-white text-black font-bold px-6 py-3 rounded-lg cursor-pointer w-full transition-colors disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed"
                        onClick={handleDelete}
                        disabled={files.length === 0}
                    >
                        Wipe App Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;