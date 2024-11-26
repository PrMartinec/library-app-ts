import express from 'express';
import log4js from 'log4js';

const app = express();
const port = 3000;
const logger = log4js.getLogger();

logger.level = "debug";


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return logger.info(`Express is listening at http://localhost:${port}`);
});