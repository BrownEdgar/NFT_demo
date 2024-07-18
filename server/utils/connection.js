const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()

const userModel = require('../models/users')(sequelize)
const productsModel = require('../models/products')(sequelize)

userModel.hasMany(productsModel)
productsModel.belongsTo(userModel)


module.exports = {
  sequelize,
  models: {
    users: userModel,
    products: productsModel,
  }
}