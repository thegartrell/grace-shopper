const db = require('../db');
const { Model, STRING, INTEGER, UUIDV4, UUID } = require('sequelize');

class Order extends Model {};
Order.init({
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  shippingAddress: {
    type: STRING,
  },
  billingAddress: {
    type: STRING,
  },
}, { sequelize: db, modelName: 'orders', timestamps: false });

module.exports = Order;
