import { Router } from 'express';
const router = Router();

// returns usage spec
router.get('/', (req, res) => {
    res.send('deCODE API')
})

export default router