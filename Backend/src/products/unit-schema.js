import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Unit = sequelize.define('units', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNullL: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Symbol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default Unit