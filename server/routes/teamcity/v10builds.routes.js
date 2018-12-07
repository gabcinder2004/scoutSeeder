import { Router } from 'express';
import * as TCController from '../../controllers/teamcity';
const router = new Router();

// failed:\s\d*
// passed:\s\d*

router.route('/:id').get((req, res) => {
  const build = req.params.id;
  const baseUrl = 'https://teamcity';
  const locator = `buildType:${build}`;

  TCController.queryTeamcity(`${baseUrl}/app/rest/builds/?locator=${locator},count:1`)
  .then((buildResult) => {
    TCController.queryTeamcity(`${baseUrl}/app/rest/builds/${buildResult.build[0].id}`).then((buildDetails) => {
      const failedRegex = /failed:\s\d*/;
      const failedMatch = buildDetails.statusText.match(failedRegex);
      const failedCount = failedMatch ? failedMatch[0].split(' ')[1] : 0;

      const passedRegex = /passed:\s\d*/;
      const passedCount = buildDetails.statusText.match(passedRegex)[0].split(' ')[1];
      const percentage = (parseInt(passedCount, 10) / (parseInt(passedCount, 10) + parseInt(failedCount, 10))) * 100;

      const finalBuild = {
        id: buildResult.build[0].id,
        number: buildResult.build[0].number,
        status: buildResult.build[0].status,
        statusText: buildDetails.statusText,
        failed: failedCount,
        passed: passedCount,
        percentage: percentage.toFixed(2),
        state: buildResult.build[0].state,
      };

      res.status(200).json(finalBuild);
    });
  })
  .catch(err => {
    res.status(500).json({
      status: err.response.status,
      statusText: err.response.statusText });
  });
});


module.exports = router;
