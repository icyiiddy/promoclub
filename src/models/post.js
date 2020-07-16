'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
			Post.hasMany(models.Comment, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Post.hasMany(models.Notification, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Post.init(
		{
			userId: DataTypes.INTEGER,
			post: DataTypes.TEXT,
			mediaFile: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Post',
		}
	);
	return Post;
};
