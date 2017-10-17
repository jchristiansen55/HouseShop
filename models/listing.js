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
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
	Listing.hasMany(models.Media);
      }
    }
  });
  return Listing;
};
