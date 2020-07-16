import express from 'express';
import AuthRoute from './auth.route';
import PostRoute from './post.route';
import NotificationRoute from './notification.route';

const app = express();

app.use('/api/auth', AuthRoute);
app.use('/api/posts', PostRoute);
app.use('/api/notifications', NotificationRoute);

export default app;
