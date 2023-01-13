import Card from './shared/Card';
import { ChangeEvent, useState } from 'react';
import Button from './shared/Button';

function FeedbackForm() {
  const [text, setText] = useState('');

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        {/* @TODO - rating select component */}
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
