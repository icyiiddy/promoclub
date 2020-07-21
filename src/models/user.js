'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Post, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Comment, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Notification, {
				foreignKey: 'recipientId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			dateOfBirth: DataTypes.DATE,
			address: DataTypes.STRING,
			profilePicture: DataTypes.STRING,
			role: DataTypes.ENUM('admin', 'moderator'),
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
