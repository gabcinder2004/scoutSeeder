import { Router } from 'express';
import * as JiraController from '../../controllers/jira';
const router = new Router();

router.route('/closed/week').get((req, res) => {
  const url = 'http://ultidev/rest/api/2/search?jql=component%20%3D%20%22Compliance%20TaxUs%22%20AND%20resolved%20%3E%20startOfWeek%28%29%20AND%20type%20not%20in%20%28%22Db%20Change%20Request%22%2C%20Epic%2C%20Patch%29%20AND%20status%20not%20in%20%28Canceled%29%20AND%20resolution%20%3D%20Fixed%20and%20%28labels%20is%20EMPTY%20or%20labels%20not%20in%20%28%27taxarrears%27%29%29';
  JiraController.queryJira(url).then(data => {
    res.status(200).json({ count: data.total });
  });
});

router.route('/closed/lastweek').get((req, res) => {
  const url = 'http://ultidev/rest/api/2/search?jql=component%20%3D%20%22Compliance%20TaxUs%22%20AND%20resolved%20%3E%20startOfWeek%28-1%29%20AND%20resolved%20%3C%20startOfWeek%28%29%20AND%20type%20not%20in%20%28%22Db%20Change%20Request%22%2C%20Epic%2C%20Patch%29%20AND%20status%20not%20in%20%28Canceled%29%20AND%20resolution%20%3D%20Fixed%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20not%20in%20%28taxarrears%29%29';
  JiraController.queryJira(url).then(data => {
    res.status(200).json({ count: data.total });
  });
});

module.exports = router;
