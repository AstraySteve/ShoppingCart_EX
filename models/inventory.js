module.exports = function(sequelize, DataTypes) {
    var Inventory = sequelize.define("inventory", {
        product_name: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        cost: DataTypes.FLOAT
    });
    return Inventory;
  };