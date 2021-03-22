import {Router, Request, Response} from 'express';

const router:Router = Router();

router.get('/', (req:Request,res:Response) => {
    res.status(200).json({'message':'Cool beans!'});
});
router.post('/', (req:Request, res: Response) => {
    res.status(200);
});

export default router;