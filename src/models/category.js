import { DataTypes } from 'sequelize'
import { sequelize } from '@/helpers/connection'
const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.TEXT,
    },

    url_name: {
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
export default Category
