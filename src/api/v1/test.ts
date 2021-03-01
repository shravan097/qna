import {Router, Request, Response} from 'express';

const router:Router = Router();

router.get('/test', (req:Request,res:Response) => {
    res.status(200).json({'message':'Cool beans!'});
})

export default router;