import React, { useState, useEffect } from 'react';
import Cards from "../../components/cards-section/Cards";
import Filter from "../../components/filter-section/Filter";
import axios from 'axios'
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [token] = useState(() => {
    return localStorage.getItem('token') || ''
  })

  useEffect(() => {

    axios("http://localhost:3000/products", {
      headers: {
        Authorization: token
      }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))

  }, [])
  return (
    <div className='Home'>
      <Filter setProducts={setProducts} setLoading={setLoading} />
      <Cards products={products} loading={loading} />
    </div>
  )
}
