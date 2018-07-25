/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class', {
    cls_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    cls_college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cls_major: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'class'
  });
};
