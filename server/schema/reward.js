/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reward', {
    info_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    info_stu_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    info_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    info_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'reward'
  });
};
