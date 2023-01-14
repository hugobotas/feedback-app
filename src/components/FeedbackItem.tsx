import { FeedbackItemType } from '../data/FeedbackData';
import Card from './shared/Card';
import { FaTimes } from 'react-icons/all';

interface FeedbackItemProps {
  item: FeedbackItemType;
  handleDelete: (arg0: number) => void;
}

function FeedbackItem({ item, handleDelete }: FeedbackItemProps) {
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => handleDelete(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
}

export default FeedbackItem;
