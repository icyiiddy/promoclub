import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';

export const signupValidation = (req, res, next) => {
	const signupSchema = Joi.object({
		firstName: Joi.string().trim().required().min(4).messages({
			'any.required': 'First Name is required',
		}),
		lastName: Joi.string().trim().required().min(4).messages({
			'any.required': 'Last Name is required',
		}),
		email: Joi.string().trim().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
		}),
		password: Joi.string().trim().required().min(6).messages({
			'any.required': 'Password is required',
			'string.min': 'Password length must be at least 6 characters long',
		}),
		confirmPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.messages({
				'any.required': 'Confirm Password is required',
				'any.only': 'Passwords must match',
			}),
	}).options({ abortEarly: false });

	const { error } = signupSchema.validate(req.body);

	if (error) {
		const errors = error.details.map(error => error.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};
