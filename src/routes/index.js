import express from 'express';
import AuthRoute from './auth.route';
import PostRoute from './post.route';

const app = express();

app.use('/api/auth', AuthRoute);
app.use('/api/posts', PostRoute);

export default app;
