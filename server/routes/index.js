import { Router } from 'express';
const ahaRoutes = require('./aha');
const jiraRoutes = require('./jira');
const router = new Router();

router.use('/aha', ahaRoutes);
router.use('/jira', jiraRoutes);

module.exports = router;
