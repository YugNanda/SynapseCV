import type { Feedback } from '../../types/index';
import ScoreBadge from './ScoreBadge';
import ScoreGauge from './ScoreGauge'

const textColor = (score: number) => {
  return score > 70 ? 'text-white' : score > 49 ? 'text-white/80' : 'text-white/60';
};

const Category = ({ title, score }: { title: string, score: number }) => {
  return (
    <div className='bg-black/40 border border-white/10 rounded-2xl p-4 hover:border-white/30 transition-all duration-300'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <div className='flex flex-col  gap-2 items-center justify-center'>
          <p className='text-xl font-semibold text-white/90'>{title}</p>
          <div>
            <ScoreBadge score={score}/>
          </div>
        </div>
        <p className='text-3xl font-bold py-2'>
          <span className={textColor(score)}>{score}</span>
          <span className='text-white/50 text-sm ml-1'>/100</span>
        </p>
      </div>
    </div>
  )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 w-full animate-fade-in-up animation-delay-600'>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex flex-col gap-2 items-center'>
          <h2 className='text-2xl font-bold text-white animate-fade-in'>Your Resume Score</h2>
          <p className='text-sm text-white/70 py-2 animate-fade-in animation-delay-200'>
            Comprehensive analysis across key resume metrics
          </p>
        </div>
        <ScoreGauge score={feedback.overallScore} />
      </div>
      <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-4 mt-8'>
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  )
}

export default Summary