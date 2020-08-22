import models from '../models';

const { Notification, User } = models;

class NotificationService {
	static createNotification(notification) {
		return Notification.create(notification);
	}

	static getAllNofications(property, { offset, limit }) {
		return Notification.findAndCountAll({
			where: property,
			order: [['id', 'DESC']],
			include: {
				model: User,
				attributes: ['id', 'firstName', 'lastName'],
			},
			offset,
			limit,
		});
	}

	static findNotification(property) {
		return Notification.findOne({ where: property });
	}

	static makeRead(notificationId, property) {
		return Notification.update(property, {
			where: notificationId,
			returning: true,
		});
	}

	static markAsRead(recipientId, property) {
		return Notification.update(property, {
			where: recipientId,
			returning: true,
		});
	}

	static removeNotification(property) {
		return Notification.destroy({ where: property });
	}

	static countNotifications(property) {
		return Notification.findAll({ where: property });
	}
}

export default NotificationService;
