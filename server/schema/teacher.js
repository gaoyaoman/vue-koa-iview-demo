/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher', {
    tea_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    tea_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tea_gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tea_tel: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tea_class: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tea_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tea_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'teacher'
  });
};
