import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
  CreationOptional, ForeignKey
} from 'sequelize';
import { Condition } from '@shared/types.js';
import { sequelize } from '../util/db.js';
import { User, Image, Category } from './index.js';

class Post extends Model<
InferAttributes<Post>, InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;

  declare title: string;

  declare price: string;

  declare description: string;

  declare condition: Condition;

  declare postcode: string;

  declare userId: ForeignKey<User['id']>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare images?: Image[];

  declare user?: User;

  declare category?: Category;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['new', 'slightly used', 'used']]
      }
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 5]
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'post'
  }
);

export default Post;
