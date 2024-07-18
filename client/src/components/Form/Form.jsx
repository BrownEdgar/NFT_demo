import React from 'react'
import { Formik, Form, Field } from 'formik'
import './Form.css'
import axios from 'axios'

const initialValues = {
  title: '',
  price: "",
  image: "",
  inStoke: "",
  category: "",
  createdAt: ""

}

export default function MainForm() {
  const handleSubmit = (values, formik) => {

    values.inStoke = values.inStoke ? values.inStoke : true;

    axios.post("http://localhost:3000/products", values,)
      .then(res => console.log(res))
      .then(() => window.location.reload())
      .catch(err => console.log(err))
      .finally(() => {
        formik.resetForm()

      })

  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="title" placeholder="title" />
          <Field type="number" name="price" placeholder="price" />
          <Field type="text" name="image" placeholder="image" />
          <Field type="date" name='createdAt' />
          <Field type="checkbox" name="inStoke" />
          <Field as="select" name="category">
            <option value="art">art</option>
            <option value="3dart">3dart</option>
            <option value="game">game</option>
            <option value="painting">painting</option>
            <option value="wallart">wallart</option>
            <option value="others">others</option>
          </Field>
          <input type="submit" value={"Add Product"} />
        </Form>
      </Formik>
    </div>
  )
}
