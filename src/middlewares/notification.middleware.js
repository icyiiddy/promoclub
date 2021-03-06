import NotificationService from '../services/notification.service';
import ResponseService from '../services/response.service';

export async function checkNotificationExists(req, res, next) {
	const notification = await NotificationService.findNotification({
		id: parseInt(req.params.notificationId),
	});

	if (!notification) {
		ResponseService.setError(404, 'Notification not found');
		return ResponseService.send(res);
	}

	if (notification.recipientId !== req.userData.id) {
		ResponseService.setError(
			401,
			"Unauthorized, can not read other's notifications"
		);
		return ResponseService.send(res);
	}
	next();
}
