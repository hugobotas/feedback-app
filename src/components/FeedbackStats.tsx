import { FeedbackItemType } from '../data/FeedbackData';

interface FeedbackStatsProps {
  feedback: FeedbackItemType[];
}

function FeedbackStats({ feedback }: FeedbackStatsProps) {
  let average: number = feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length;
  average = parseFloat(average.toFixed(1).replace(/[.,]0$/, ''));

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;
