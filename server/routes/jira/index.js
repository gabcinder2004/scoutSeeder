import { Router } from 'express';
const issues = require('../jira/jiraIssues.routes');
const router = new Router();

router.use('/issues', issues);

module.exports = router;
