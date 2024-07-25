import React, { useState, useEffect } from 'react';
import Cards from "../../components/cards-section/Cards";
import Filter from "../../components/filter-section/Filter";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Home.css';

export default function Home() {
  const [token] = useState(() => {
    return localStorage.getItem('token') || ''
  })


  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    status: false,
    message: ''
  })

  const navigate = useNavigate()
  useEffect(() => {
    console.log(document.cookie)

  }, [])


  useEffect(() => {
    if (token) {
      setError({ status: false })
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
      axios("http://localhost:3000/products")
        .then(res => {
          setProducts(res.data)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          setError({
            status: true,
            message: err.response.data.message
          })
        })
    }


  }, [])

  return (
    <div className='Home'>
      {
        error.status && <h1 className='error'>{error.message}</h1>
      }
      <Filter setProducts={setProducts} setLoading={setLoading} />
      <Cards products={products} loading={loading} />

    </div>
  )
}
