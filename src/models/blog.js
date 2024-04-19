import { DataTypes } from 'sequelize'
import { sequelize } from '@/helpers/connection'
const Blog = sequelize.define(
  'blog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    img: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.TEXT,
    },
    content: {
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
export default Blog
