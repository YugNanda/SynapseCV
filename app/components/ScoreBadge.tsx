interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-white/20 text-white border border-white/30';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-white/10 text-white/80 border border-white/20';
    badgeText = 'Good';
  } else {
    badgeColor = 'bg-white/5 text-white/60 border border-white/10';
    badgeText = 'Fair';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor} backdrop-blur-sm`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;