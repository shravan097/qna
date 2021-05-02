import {Router} from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as question from '../../controllers/question/question'
const router:Router = Router()

router.get('/', expressAsyncHandler(question.getQuestion))
router.post('/', expressAsyncHandler(question.postQuestion))

export default router