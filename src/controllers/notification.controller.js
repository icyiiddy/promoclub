import NotificationService from '../services/notification.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

class NotificationController {
	static async getNofitications(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await NotificationService.getAllNofications(
			{ recipientId: req.userData.id },
			{ offset, limit }
		);
		ResponseService.setSuccess(200, 'All Recipient Notifications', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: results.rows,
		});
		return ResponseService.send(res);
	}

	static async readNotification(req, res) {
		const read = await NotificationService.makeRead(
			{ id: parseInt(req.params.notificationId) },
			{ read: true }
		);
		ResponseService.setSuccess(200, 'Notification was read', read);
		return ResponseService.send(res);
	}

	static async markNotificationAsRead(req, res) {
		const read = await NotificationService.markAsRead(
			{ recipientId: req.userData.id },
			{ read: true }
		);
		ResponseService.setSuccess(200, 'Notifications marked as read', read);
		return ResponseService.send(res);
	}
}

export default NotificationController;
