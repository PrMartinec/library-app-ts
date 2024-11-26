import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import connectDB from "./utils/mongooseUtil.js";
import logger from './utils/loggerUtil.js';

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    return logger.info(`Express is listening at http://localhost:${PORT}`);
});