import { Router } from 'express';
import * as AhaController from '../../controllers/aha';
const router = new Router();

// Get all features by release id or feature id
router.route('/').get(AhaController.Products.getAll);
router.route('/:id').get(AhaController.Products.get);
module.exports = router;
