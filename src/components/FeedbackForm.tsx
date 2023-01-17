import Card from './shared/Card';
import Button from './shared/Button';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useContext } from 'react';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

interface FormValuesType {
  review: string;
  rating: string;
}

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
  const initialValues: FormValuesType = { review: '', rating: '' };

  function handleSubmit(values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) {
    const newFeedback = {
      review: values.review,
      rating: values.rating,
    };
    if (feedbackEdit.edit) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }
    formikHelpers.resetForm();
  }

  return (
    <Card>
      <Formik
        enableReinitialize={true}
        validateOnMount={true}
        initialValues={
          feedbackEdit.edit
            ? { review: feedbackEdit.item.review, rating: feedbackEdit.item.rating }
            : initialValues
        }
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          review: Yup.string().min(10, 'Text must be at least 10 characters').required('Required'),
        })}
      >
        {(formik) => (
          <Form>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect />
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
