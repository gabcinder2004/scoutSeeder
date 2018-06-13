import { Router } from 'express';
import * as JiraController from '../../controllers/jira';
const router = new Router();

router.route('/').get((req, res) => {
  if (req.query.featureid) {
    // JiraController.Issues.getIssuesByAhaFeatureId(req, res);
  }
});
module.exports = router;
