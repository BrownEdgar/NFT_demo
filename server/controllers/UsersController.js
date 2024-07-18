class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await req.app.services.users.getAllUsers();
      res.json(users)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
  async signUp(req, res) {
    const body = req.body
    try {
      const token = await req.app.services.users.signUp(body);
      res.json({ token })
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
  async signIn(req, res) {

    const { body } = req;

    try {
      const token = await req.app.services.users.signIn(body);
      res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(403).json({ error: error.message })
    }
  }
}


module.exports = UserController