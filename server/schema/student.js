/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    stu_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    stu_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stu_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stu_class: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    stu_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stu_tel: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stu_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'student'
  });
};
