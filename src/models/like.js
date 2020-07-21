'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Like.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
			Like.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
		}
	}
	Like.init(
		{
			likeId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			isLiked: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Like',
		}
	);
	return Like;
};
