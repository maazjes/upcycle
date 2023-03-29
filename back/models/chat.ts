import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import { sequelize } from '../util/db.js';
import { Message, User } from './index.js';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;

  declare creatorId: ForeignKey<User['id']>;

  declare userId: ForeignKey<User['id']>;

  declare archived: boolean;

  declare lastMessageId: CreationOptional<Message['id']>;

  declare lastMessage?: Message;

  declare creator?: User;

  declare user?: User;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creatorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'messages', key: 'id' }
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'chat'
  }
);

export default Chat;
