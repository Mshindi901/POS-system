import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('pos', 'postgres', 'Yugah2005@',{
    dialect: 'postgres',
    host: 'localhost',
    logging: false
});

export default sequelize;