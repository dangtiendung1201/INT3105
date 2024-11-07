import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ApiHealth = db.define('ApiHealth', {
  apiUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responseTime: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default ApiHealth;
export const create = ApiHealth.create;
