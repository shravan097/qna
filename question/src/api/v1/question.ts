import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import * as question from '../../controllers/question';
const router:Router = Router();

router.get('/', expressAsyncHandler(question.getQuestions));
router.post('/', expressAsyncHandler(question.getQuestions));

export default router;