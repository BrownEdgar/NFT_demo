const jwt = require('jsonwebtoken')
const checkToken = async (req, res, next) => {
  const token = req?.headers['authorization']?.split(' ')[1]
  console.log('token', req?.headers);

  if (!token) {
    res.status(500).json({ message: "no token" });
    return;
  } else {
    try {
      const isValid = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log("isValid", isValid);
      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }

  }

}

module.exports = {
  checkToken
}