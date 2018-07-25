/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clscore', {
    cs_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    cs_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cs_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cs_class: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cs_tea_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cs_term: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cs_course: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'clscore'
  });
};
