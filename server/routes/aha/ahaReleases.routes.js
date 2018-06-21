import { Router } from 'express';
import * as AhaController from '../../controllers/aha';
const router = new Router();

// Get all features by release id or feature id
router.route('/').get(AhaController.Releases.getAll);
router.route('/:id').get(AhaController.Releases.get);
module.exports = router;
