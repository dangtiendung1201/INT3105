import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ServerHealth = db.define('ServerHealth', {
  cpuUsage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  memoryUsage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  romUsage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  bandwidth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default ServerHealth;
