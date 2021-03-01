import express, { Application, Request, Response, NextFunction,Router } from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import Helmet from 'helmet'
import {name, version} from '../package.json'; 
import v1Router from './api/v1/test';

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
    log.debug(`${req.method} ${req.url}`)
    res.status(404).json(`${req.method} ${req.url} Not found`);
})

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    log.error(err);
    res.status(500);
})

app.listen(8080, () => {
    log.info('Server is running on port 8080');
});