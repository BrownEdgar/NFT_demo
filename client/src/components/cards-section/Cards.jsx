


import "./cards.css";

const Cards = ({ products, loading }) => {
  console.log(loading)

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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
