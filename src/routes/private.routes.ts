import { Router } from "express";
const router = Router();
import { getLineUp, addToLineUp, deleteToLineUp} from '../controllers/lineup.controller';
import passport from 'passport';

router.get('/api/lineup/:id', passport.authenticate('jwt', { session: false}), getLineUp);
router.post('/api/lineup', passport.authenticate('jwt', { session: false}), addToLineUp);
router.delete('/api/lineup', passport.authenticate('jwt', { session: false}), deleteToLineUp);

export default router;