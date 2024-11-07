import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ContainerHealth = db.define('ContainerHealth', {
  containerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpuUsage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  memoryUsage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  netIo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blockIo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responseTime: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default ContainerHealth;
