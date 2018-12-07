import { Router } from 'express';
const jiraRoutes = require('./jira');
const tcRoutes = require('./teamcity');

const router = new Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, branch'
  );
  next();
});

router.use('/jira', jiraRoutes);
router.use('/tc', tcRoutes);

module.exports = router;
