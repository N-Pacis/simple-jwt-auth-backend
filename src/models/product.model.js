import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';
import UserModel from './user.model.js';

const ProductModel = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  added_by: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    allowNull: true,
  }
},{
    timestamps:false,
    tableName: "products"
  },
);

export default ProductModel