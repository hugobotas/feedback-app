import Card from './shared/Card';
import Button from './shared/Button';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import RatingSelect from './RatingSelect';
import { v4 as uuidv4 } from 'uuid';

interface FormValuesType {
  review: string;
}

interface FeedbackFormProps {
  handleAdd: (review: { rating: number; text: string; id: string }) => void;
}

function FeedbackForm({ handleAdd }: FeedbackFormProps) {
  const initialValues: FormValuesType = { review: '' };
  const [rating, setRating] = useState(0);

  function handleSubmit(values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) {
    const newFeedback = {
      text: values.review,
      rating,
      id: uuidv4(),
    };
    handleAdd(newFeedback);
    formikHelpers.resetForm();
  }

  return (
    <Card>
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          review: Yup.string().min(10, 'Text must be at least 10 characters').required('Required'),
        })}
      >
        {(formik) => (
          <Form>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating: number) => setRating(rating)} />
            <div className='input-group'>
              <Field name='review' type='text' placeholder='Write a review' />
              <Button type='submit' isDisabled={!!formik.errors.review}>
                Send
              </Button>
            </div>
            <ErrorMessage name='review' className='message' component='div' />
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default FeedbackForm;
