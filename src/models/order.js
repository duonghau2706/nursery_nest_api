import { DataTypes } from 'sequelize'
import { sequelize } from '@/helpers/connection'
const Order = sequelize.define(
  'order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    order_code: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: true,
    },
    status_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_ship: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    province: {
      type: DataTypes.TEXT,
    },
    district: {
      type: DataTypes.TEXT,
    },
    ward: {
      type: DataTypes.TEXT,
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    original_total_money: {
      type: DataTypes.DECIMAL(15, 3),
    },
    ship: {
      type: DataTypes.DECIMAL(15, 0),
    },
    sale: {
      type: DataTypes.DECIMAL(15, 2),
    },
    total_money: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
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
export default Order
