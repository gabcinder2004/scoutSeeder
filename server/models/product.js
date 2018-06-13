module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: {
      type: DataTypes.STRING,
    },
    short_name: DataTypes.STRING,
    product_line: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {});

//   Product.associate = (models) => {
//     // associations can be defined here
//   };

  return Product;
};
