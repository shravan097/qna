import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import Helmet from 'helmet';
import {name, version} from '../package.json'; 
import {v1Router} from './api/v1';

const log: Logger = new Logger();
const app: Application = express();

app.use(Helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/version', (req: Request, res: Response) => {
    res.json({name, version});
});
app.use('/v1',v1Router);
app.use((req: Request, res: Response) => {
    log.error(`${req.method} ${req.url}`);
    res.status(404).json(`${req.method} ${req.url} Not found`);
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error(err);
    res.status(500).send('Error');
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
});