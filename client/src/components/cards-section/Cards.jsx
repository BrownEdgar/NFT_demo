import axios from 'axios'

import "./cards.css";

const Cards = ({ products, loading }) => {

  const handleClick = (id) => {
    axios.post('http://localhost:3000/buyItem', { productId: id })
      .then(res => {
        window.location = res.data.url
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="cards">
      <p className="founded-text">{products.length} results found</p>
      <div className="product-cards">
        {loading ? (
          <h1 className='loader'>Loading...</h1>
        ) : products.map((product) => {
          return (
            <div key={product.id} className="product-card">

              <img src={product.image} className="product-image" />
              <div className="info">
                <span>{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="price">price:-</p>
                <p className="product-price">{product.price}</p>
                <button className='btn' onClick={() => handleClick(product.id)}>buy</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
