import { DataTypes } from 'sequelize'
import { sequelize } from '@/helpers/connection'
const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.INTEGER,
    },
    original_price: {
      type: DataTypes.DECIMAL(15),
    },
    // discount_id: {
    //   type: DataTypes.UUID,
    // },
    description: {
      type: DataTypes.TEXT,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)
export default Product
