import { Router } from "express";
const router = Router();

import { sigIn, signUp} from '../controllers/user.controller';

router.post('/signup', signUp);
router.post('/signin', sigIn);

export default router;