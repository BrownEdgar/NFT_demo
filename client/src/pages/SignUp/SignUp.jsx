import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import './SignUp.css'

export default function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password, name } = e.target;
    const user = {
      email: email.value,
      password: password.value,
      name: name.value,
    }

    axios.post("http://localhost:3000/users/sign-up", user,)
      .then(res => {
        console.log(' res.data', res.data)
        localStorage.setItem('token', res.data.token);

      })
      .catch(err => console.log(err))
  }

  const handleGoogle = () => {
    window.location.assign('http://localhost:3000/auth/google')

  }
  const handleGitHub = () => {
    window.location.assign('http://localhost:3000/auth/github')
  }

  return (
    <div className='SignUp'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" id='email' />
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id='name' />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id='password' />
        </div>
        <div>
          <input type="submit" value="Reginster" />
        </div>
      </form>
      <div className="buttons">
        <button onClick={handleGoogle} className=' btn google__btn'>
          <AiFillGoogleCircle />
          Google
        </button>
        <button onClick={handleGitHub} className=' btn google__btn'>
          <FaGithub /> Github
        </button>
      </div>
    </div>
  )
}
