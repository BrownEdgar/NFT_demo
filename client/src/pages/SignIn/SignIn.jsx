import React from 'react'
import axios from 'axios'

import './SignIn.css'

export default function SignIn() {

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = e.target;
    const user = {
      email: email.value,
      password: password.value,

    }

    axios.post("http://localhost:3000/users/sign-in", user,)
      .then(res => {
        console.log(' res.data', res.data)
        localStorage.setItem('token', res.data.token);
      })
      .catch(({ response }) => alert(response.data.error))
  }
  return (
    <div className='SignUp'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" id='email' />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" id='password' />
        </div>
        <div>

          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}
