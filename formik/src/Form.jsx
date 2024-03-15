import { Formik, Form, Field, useFormik, ErrorMessage, useField } from 'formik'

import * as Yup from 'yup'

/*const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required field'
  } else if (values.name.length < 2) {
    errors.name = 'Fill Min 2 letters'
  }

  if (!values.email) {
    errors.email = 'Required field'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}*/
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}
const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'textarea' })
  return (
    <>
      <label className="textarea" htmlFor={props.name}>
        {label}
      </label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field} />
        {children}
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </label>
    </>
  )
}

const CustomForm = () => {
  /*const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Min 2 letters').required('Required field'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required field'),
      amount: Yup.number().min(5, 'Min 5 items').required('Required field'),
      currency: Yup.string().required('Select currency'),
      text: Yup.string().min(10, 'Min 10 letters'),
      terms: Yup.boolean()
        .required('Required to fill')
        .oneOf([true], 'Is needed to agree'),
    }),
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  })*/
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2, 'Min 2 letters').required('Required field'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required field'),
        amount: Yup.number().min(5, 'Min 5 items').required('Required field'),
        currency: Yup.string().required('Select currency'),
        text: Yup.string().min(10, 'Min 10 letters'),
        terms: Yup.boolean()
          .required('Required to fill')
          .oneOf([true], 'Is needed to be agreed'),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Send donations</h2>
        <MyTextInput label="Your name" id="name" name="name" type="text" />

        <MyTextInput label="Your email" id="email" name="email" type="email" />

        <MyTextInput label="Amount" id="amount" name="amount" type="number" />

        <label htmlFor="currency">Currency</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />
        <MyTextArea
          label="Your message"
          id="text"
          name="text"
          type="textarea"
        />
        <ErrorMessage className="error" name="text" component="div" />
        <MyCheckbox name="terms">Agree with use and terms politics</MyCheckbox>
        <button type="submit">Send</button>
      </Form>
    </Formik>
  )
}

export default CustomForm
