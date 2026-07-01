import sequelize from "../config/db-config.js";

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force: true});
        console.log('Database Models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return null;
    }
};

export default connectDB;