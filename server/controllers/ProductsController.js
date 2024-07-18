class ProductsController {

  async getAllProducts(req, res) {
    try {
      const products = await req.app.services.products.getAllProducts();
      res.json(products)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
  async getByCategory(req, res) {
    const { category } = req.query
    try {
      const products = await req.app.services.products.getByCategory(category);
      res.json(products)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
  async addProduct(req, res) {
    const { body: product } = req;
    console.log('product', product)
    try {
      const result = await req.app.services.products.addProduct(product);
      res.json(result)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
}

module.exports = ProductsController