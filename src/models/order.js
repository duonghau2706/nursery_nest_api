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
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_money: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_id: {
      type: DataTypes.UUID,
    },
    ship: {
      type: DataTypes.DECIMAL(15, 3),
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
