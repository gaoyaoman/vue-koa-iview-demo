/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timetable', {
    t_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    t_user: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    t_zhouyi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhouer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhousan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhousi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhouwu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhouliu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_zhouri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    t_year: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    t_order: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'timetable'
  });
};
