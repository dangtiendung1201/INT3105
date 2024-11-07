import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: 'localhost',
    username: 'monitor',
    password: 'monitor',
    database: 'monitor',
    dialect: 'mysql',
});

export default sequelize;
