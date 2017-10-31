const Listing = sequelize.define('Listing', {
  thumbnail: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  state: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  numBedrooms: {
    type: Sequelize.INTEGER
  },
  numBathrooms: {
    type: Sequelize.FLOAT
  },
  square_feet: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  }
});
