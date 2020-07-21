import Joi from "@hapi/joi";
import ResponseService from "../services/response.service";

export const validateNotificationUrlParam = (req, res, next) => {
	const schema = Joi.object({
		notificationId: Joi.string()
			.regex(/^[0-9]{1,}$/)
			.messages({
				'string.pattern.base': 'Id must be a number',
			}),
	});

	const { error } = schema.validate(req.params);

	if (error) {
		const errors = error.details.map(error => error.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};