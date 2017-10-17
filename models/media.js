'use strict';
module.exports = (sequelize, DataTypes) => {
  var Media = sequelize.define('Media', {
    filename: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
	Media.belongsTo(models.Listing);
      }
    }
  });
  return Media;
};
