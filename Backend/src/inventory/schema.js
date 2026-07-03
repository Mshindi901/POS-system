import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Inventory = sequelize.define('inventory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model:'products',
            key:'id'
        }
    },
    quantity: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    minimum_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maximum_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {timestamps: true});
export default Inventory;