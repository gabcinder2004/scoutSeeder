module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define('Feature', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    reference_num: DataTypes.STRING,
    owner: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    original_estimate: DataTypes.SMALLINT,
    remaining_estimate: DataTypes.SMALLINT,
    work_units: DataTypes.SMALLINT,
    work_done: DataTypes.SMALLINT,
    use_requirements_estimate: DataTypes.BOOLEAN,
    dev_team: DataTypes.STRING,
    compliance_score: DataTypes.STRING,
    internal_id: DataTypes.INTEGER,
    tags: DataTypes.JSON,
    // ReleaseId: DataTypes.STRING,
  }, {});

  Feature.associate = (models) => {
    Feature.belongsTo(models.Release);
  };

  return Feature;
};
