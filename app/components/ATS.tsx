import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine border color based on score
  const scoreBorderClass = score > 69
    ? 'border-white/20'
    : score > 49
      ? 'border-white/15'
      : 'border-white/10';

  // Determine accent color based on score
  const scoreAccentClass = score > 69
    ? 'text-white'
    : score > 49
      ? 'text-white/80'
      : 'text-white/60';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Excellent ATS Compatibility'
    : score > 49
      ? 'Good Foundation'
      : 'Needs Optimization';

  return (
    <div className={`bg-black/60 backdrop-blur-sm border ${scoreBorderClass} rounded-2xl p-6 hover:border-white/50 transition-all duration-300 w-full animate-fade-in-up animation-delay-700`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12 relative" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">ATS Score</h2>
          <p className={`text-3xl font-bold py-1 ${scoreAccentClass}`}>
            {score}<span className='text-white/50 text-lg'>/100</span>
          </p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white/90">{subtitle}</h3>
        <p className="text-white/70 mb-6 py-2">
          Your resume's compatibility with Applicant Tracking Systems (ATS). Higher scores indicate better formatting and keyword optimization for automated screening.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <img
                  src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5 mt-0.5"
                />
                <p className={suggestion.type === "good" ? "text-white" : "text-white/80"}>
                  {suggestion.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-white/60 italic border-t border-white/10 pt-4">
        Optimize your resume to pass ATS filters and reach human recruiters.
      </p>
    </div>
  )
}

export default ATS