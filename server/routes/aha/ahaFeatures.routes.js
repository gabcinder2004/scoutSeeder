import { Router } from 'express';
import * as AhaController from '../../controllers/aha';
const router = new Router();

router.route('/').get(AhaController.Features.getAll);
router.route('/:id').get(AhaController.Features.get);
module.exports = router;
