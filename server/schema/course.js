/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    cor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    cor_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cor_hour: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cor_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cor_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cor_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cor_score: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cor_score1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'course'
  });
};
