const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
  return sequelize.define(
    'products',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        // defaultValue: 'John Doe'
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        unique: true
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      inStoke: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM,
        values: ["art", "3D art", 'game', 'painting', 'wall art', 'others'],
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    },
  );
}
