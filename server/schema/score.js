/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('score', {
    sco_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    sco_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sco_stu_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sco_score: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sco_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sco_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sco_tea_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    term: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sco_stu_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sco_class: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'score'
  });
};
