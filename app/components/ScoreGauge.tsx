import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Determine gauge color based on score
    const getGaugeColor = (score: number) => {
        if (score > 70) return '#ffffff';
        if (score > 49) return 'rgba(255, 255, 255, 0.8)';
        return 'rgba(255, 255, 255, 0.6)';
    };

    return (
        <div className="flex flex-col items-center animate-fade-in animation-delay-400">
            <div className="relative w-48 h-24">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc with rounded ends */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke={getGaugeColor(score)}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div className="text-3xl font-bold text-white py-2">{score}<span className='text-white/50 text-lg'>/100</span></div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;