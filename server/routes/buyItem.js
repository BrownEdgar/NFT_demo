var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', async function (req, res) {

  const { productId } = req.body;
  const result = await req.app.models.products.findAll({
    where: { id: productId }
  })
  const product = JSON.parse(JSON.stringify(result[0]));
  console.log(product)

  const checkOutOptions = {
    payment_method_types: ['card'],
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: product?.title,
        },
        unit_amount: (product.price * 3000) * 100,
      },
      quantity: 1,
    }],
    success_url: `${process.env.CLIENT_URL}/buyitem/success`,
    cancel_url: `${process.env.CLIENT_URL}/buyitem/cancel`,
  }

  try {
    const session = await req.app.stripe.checkout.sessions.create(checkOutOptions)
    res.json({ url: session.url, product })
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }

});

router.get('/success', (req, res) => {
  res.send("payment success ")
})
router.get('/cancel', (req, res) => {
  res.send("payment canceled! ")
})

module.exports = router;
