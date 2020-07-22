'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Unlike extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Unlike.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
			Unlike.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
		}
	}
	Unlike.init(
		{
      unlikeId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			isUnliked: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Unlike',
		}
	);
	return Unlike;
};
