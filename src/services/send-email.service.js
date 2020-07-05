import sgMail from '@sendgrid/mail';

class SendEmailService {
	static sendEmailToUser(email, subject, body) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: email,
			from: process.env.ADMIN_EMAIL,
			subject: subject,
			html: body,
		};
		sgMail.send(msg);
	}
}

export default SendEmailService;
