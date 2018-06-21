module.exports = (sequelize, DataTypes) => {
  const Release = sequelize.define('Release', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    reference_num: { type: DataTypes.STRING },
    start_date: DataTypes.DATE,
    release_date: DataTypes.DATE,
    development_started_date: DataTypes.DATE,
    owner: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    // productId: DataTypes.STRING,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    released: DataTypes.BOOLEAN,
    original_estimate: DataTypes.SMALLINT,
    remaining_estimate: DataTypes.SMALLINT,
    work_units: DataTypes.SMALLINT,
    work_done: DataTypes.SMALLINT,
    // Product: DataTypes.STRING,

  }, {});

  Release.associate = (models) => {
    Release.belongsTo(models.Product);
  };

  return Release;
};
