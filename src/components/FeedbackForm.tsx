import Card from './shared/Card';
import Button from './shared/Button';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import React from 'react';

interface FormValuesType {
  review: string;
}

function FeedbackForm() {
  const initialValues: FormValuesType = { review: '' };
  return (
    <Card>
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={Yup.object({
          review: Yup.string().min(10, 'Must be at least 10 characters').required('Required'),
        })}
      >
        {(formik) => (
          <Form>
            <h2>How would you rate your service with us?</h2>
            {/* @TODO - rating select component */}
            <div className='input-group'>
              <Field name='review' type='text' placeholder='Write a review' />
              <Button type='submit' isDisabled={!!formik.errors.review}>
                Send
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default FeedbackForm;
