import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Category = sequelize.define('categories', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    }
}, {timestamps:true});
export default Category;