import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    unit_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'units',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    buying_price: {
        type:DataTypes.DECIMAL(0, 9),
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.DECIMAL(0, 9),
        allowNull: false,
    },
    tax_id: {
        type:DataTypes.UUID,
        references: {
            model: 'taxes',
            key: 'id'
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image_path:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default Product;