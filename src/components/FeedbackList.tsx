import { FeedbackItemType } from '../data/FeedbackData';
import FeedbackItem from './FeedbackItem';

interface FeedbackListProps {
  feedback: FeedbackItemType[];
  handleDelete: any;
}

function FeedbackList({ feedback, handleDelete }: FeedbackListProps) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className='feedback-list'>
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default FeedbackList;
