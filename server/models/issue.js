module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.STRING,
    },
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    type: DataTypes.STRING,
    fixVersion: DataTypes.STRING,
    resolution: DataTypes.STRING,
    assignee: DataTypes.STRING,
    // components: DataTypes.ARRAY,
    createdBy: DataTypes.STRING,
    reporter: DataTypes.STRING,
      // ReleaseId: DataTypes.STRING,
  }, {});

  Issue.associate = (models) => {
        // Issue.belongsTo(models.Release);
  };

  return Issue;
};

