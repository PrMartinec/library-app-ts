import mongoose from 'mongoose';
import logger from '../utils/loggerUtil';

const PORT = process.env.DB_PORT || 27017;
const SERVER = process.env.DB_SERVER || '127.0.0.1';

export default function connectDB(): void {
    const url = `mongodb://${SERVER}:${PORT}`;
    logger.info(`Trying to connect to database: ${url}`);

    mongoose.connect(url).catch((err) => {
        logger.error(`Initial connection error: ${err}`);
    });

    const dbConnection = mongoose.connection;
    dbConnection.once('open', () => {
        logger.info(`Database connected: ${url}`);
    });

    dbConnection.on('error', (err) => {
        logger.error(`Connection error: ${err}`);
    });
}
