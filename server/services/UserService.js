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

  async signIn({ email, password }) {
    const user = await this.models.users.findAll({
      where: {
        email,
        password
      }
    })
    const result = JSON.parse(JSON.stringify(user))

    if (user.length === 0) {
      throw new Error("Invalid email or password")
    } else {
      // Token-ի ստեղծում 
      console.log(111,)
      const token = jwt.sign({ email: result[0].email }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
      return token
    }
  }
}


module.exports = UserService