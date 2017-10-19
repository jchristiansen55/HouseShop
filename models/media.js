'use strict';
module.exports = (sequelize, DataTypes) => {
  var Media = sequelize.define('Media', {
    listingID: DataTypes.INTEGER,
    imageFilePath: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Media;
};