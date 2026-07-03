import sequelize  from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const inventoryMovement = sequelize.define('inventory_movements', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model: 'products',
            key: 'id'
        }
    },
    user_id: {
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    movement_type: {
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {timestamps: true});

export default inventoryMovement;