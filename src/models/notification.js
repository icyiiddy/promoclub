'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Notification extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Notification.belongsTo(models.Post, {
				foreignKey: 'postId',
				targetKey: 'id',
			});
			Notification.belongsTo(models.User, {
				foreignKey: 'recipientId',
				targetKey: 'id',
			});
		}
	}
	Notification.init(
		{
			senderId: DataTypes.INTEGER,
			recipientId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			read: DataTypes.BOOLEAN,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Notification',
		}
	);
	return Notification;
};
