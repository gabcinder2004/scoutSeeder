import { Router } from 'express';
const customFields = require('../jira/jiraCustomFields.routes');
const issues = require('../jira/jiraIssues.routes');
const router = new Router();

router.use('/cf', customFields);
router.use('/issues', issues);

module.exports = router;
