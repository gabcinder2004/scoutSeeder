module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: { type: DataTypes.STRING },
    name: {
      type: DataTypes.STRING,
    },
    reference_prefix: DataTypes.STRING,
    product_line: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE,
  }, {});

//   Product.associate = (models) => {
//     // associations can be defined here
//   };

  return Product;
};
