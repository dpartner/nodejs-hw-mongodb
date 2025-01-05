import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use('/', routes);
app.use('/api-docs', swaggerDocs());

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
