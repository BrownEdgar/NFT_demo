class ProductsService {
  constructor(models) {
    this.models = models
  }
  async getAllProducts() {
    const products = await this.models.products.findAll({
      include: [{ model: this.models.users, as: "user" }]
    })
    return products
  }

  async addProduct(product) {
    console.log('product', product)
    const result = new this.models.products({ ...product, userId: 1 });
    await result.save();
    return result
  }
  async getByCategory(category) {
    const option = {}
    if (category !== "all") {
      option.where = { category }
    }
    const result = this.models.products.findAll(option)
    return result
  }
}

module.exports = ProductsService