var jwt = require('jsonwebtoken');
class UserService {
  constructor(models) {
    this.models = models
  }
  async getAllUsers() {
    const users = await this.models.users.findAll()
    return users
  }
  async signUp(body) {
    const user = new this.models.users({ ...body })
    await user.save();
    const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN)
    return token
  }
}


module.exports = UserService