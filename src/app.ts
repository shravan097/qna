import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';

const log: Logger = new Logger();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req: Request, res: Response) => {
    res.send("Type Script Express is running");
});

app.listen(8080, () => {
    log.info('Server is running on port 8080');
});