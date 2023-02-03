// eslint-disable-next-line import/no-import-module-exports
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }): Promise<void> => {
    await queryInterface.addColumn('posts', 'condition', {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['new', 'slightly used', 'used']]
      }
    });
    await queryInterface.addColumn('posts', 'postcode', {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 5]
      }
    });
  },
  down: async ({ context: queryInterface }: { context: QueryInterface }): Promise<void> => {
    await queryInterface.removeColumn('posts', 'condition');
    await queryInterface.removeColumn('posts', 'postcode');
  }
};
