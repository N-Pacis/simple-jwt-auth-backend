import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';
import UserModel from './user.model.js';

const ProductModel = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  added_by: {
    type: DataTypes.UUID,
    references: {
      model: UserModel,
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    allowNull: true,
  }
},{
    timestamps:true,
    tableName: "product"
  },
);

export default ProductModel