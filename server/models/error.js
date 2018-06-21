module.exports = (sequelize, DataTypes) => {
  const Error = sequelize.define('Error', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    path: DataTypes.STRING,
    other: DataTypes.STRING,
  }, {});

  return Error;
};

