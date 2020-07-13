import ResponseService from '../services/response.service';

export const checkUserAccount = (req, res, next) => {
	if (!req.userData.id) {
		ResponseService.setError(401, 'Unauthorized, not your account');
		ResponseService.send(res);
	}
	next();
};
