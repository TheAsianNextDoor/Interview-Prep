import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { authHandlerMiddleware } from './middleware/auth-handler';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { endLoggingHandlerMiddleware, startLoggingHandlerMiddleware } from './middleware/logging-handler';
import { routeNotFoundMiddleware } from './middleware/route-not-found-handler';
import { authRouter } from './routers/auth';
import { productRouter } from './routers/products';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.API_VERSION || 'v1';

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(startLoggingHandlerMiddleware);

// App Routes
const mainRouter = express.Router();
app.use(`/api/${version}`, mainRouter);

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', authHandlerMiddleware, productRouter);

app.use(endLoggingHandlerMiddleware);

// Error Routes
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // connect to DB
    await mongoose.connect(
      'mongodb+srv://Aaron-Scherling:69WJZ48VPBHf9j5d@cluster0.vqvwg9c.mongodb.net/Express-Server?retryWrites=true&w=majority',
    );
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (e) {
    console.error(e);
  }
};

start();
