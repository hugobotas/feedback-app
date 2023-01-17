import { Field } from 'formik';

function RatingSelect() {
  return (
    <ul className='rating'>
      {[...Array(10)].map((x, i) => (
        <li key={i + 1}>
          <Field type='radio' id={`num${i + 1}`} name='rating' value={`${i + 1}`} />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
}

export default RatingSelect;
