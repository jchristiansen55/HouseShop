'use strict';
module.exports = (sequelize, DataTypes) => {
  var Listing = sequelize.define('Listing', {
    listingID: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    price: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    address: DataTypes.STRING,
    numBedrooms: DataTypes.INTEGER,
    numBathrooms: DataTypes.FLOAT,
    square_feet: DataTypes.INTEGER,
    description: DataTypes.STRING
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
