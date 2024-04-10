import { DataTypes } from 'sequelize'
import { sequelize } from '@/helpers/connection'
const Discount = sequelize.define(
  'discount',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sale: {
      type: DataTypes.DECIMAL(15, 3),
    },
    start_date: {
      type: DataTypes.TEXT,
    },
    end_date: {
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
export default Discount
