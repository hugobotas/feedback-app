import { FeedbackItemType } from '../data/FeedbackData';
import Card from './shared/Card';
import { FaEdit, FaTimes } from 'react-icons/all';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

interface FeedbackItemProps {
  item: FeedbackItemType;
}

function FeedbackItem({ item }: FeedbackItemProps) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button className='edit' onClick={() => editFeedback(item)}>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.review}</div>
    </Card>
  );
}

export default FeedbackItem;
