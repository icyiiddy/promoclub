# Promoclub

Promoclub is a social media where people can share photos and comments. This API has different endpoints which are:

- POST `/api/auth/signup`: Signup a user
- POST `/api/auth/login`: Login a user
- GET `/api/auth/google`: Login using google account
- GET `/api/auth/facebook`: Login using facebook account
- GET `/api/auth/search-account`: Search account in case you need to reset password
- PATCH `/api/auth/reset-password`: Reset password
- GET `/api/auth/profile/:id`: View user profile
- PATCH `/api/auth/edit-profile/:id`: Edit user profile
- POST `/api/posts`: Post a status 