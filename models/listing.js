'use strict';
module.exports = (sequelize, DataTypes) => {
  var Listing = sequelize.define('Listing', {
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.FLOAT,
    square_feet: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.TEXT,
    picture: DataTypes.BLOB,
	picture_filename: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Listing;
};
