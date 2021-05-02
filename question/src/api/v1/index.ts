import question from './question'
import {Router} from 'express'

const router:Router = Router()

router.use('/questions', question)
export {router as v1Router}