import { Router } from 'express';
import * as TCController from '../../controllers/teamcity';
const router = new Router();

function checkForFailBuild(url) {
  return new Promise((resolve, reject) => {
    const failedBuilds = [];

    TCController.queryTeamcity(url)
      .then(results => {
        results.buildType.forEach(result => {
          if (
            result.builds.build.length > 0 &&
            result.builds.build[0].status !== 'SUCCESS'
          ) {
            const regex = /\w[^-]*$/;
            const cleanName = result.name.match(regex)[0];
            failedBuilds.push({
              name: cleanName,
              number: result.builds.build[0].number,
              status: result.builds.build[0].status,
              statusText: result.builds.build[0].statusText,
            });
          }
        });
        resolve(failedBuilds);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getLatestBuilds(branch) {
  return new Promise((resolve, reject) => {
    const commitURL = `http://ci.mia.ucloud.int/app/rest/buildTypes?locator=affectedProject:(id:NPCALCommitStage)&fields=buildType(id,name,builds($locator(${branch}running:false,canceled:false,count:1),build(number,status,statusText)))`;
    const acceptanceURL = `http://ci.mia.ucloud.int/app/rest/buildTypes?locator=affectedProject:(id:NPCALAcceptanceTests)&fields=buildType(id,name,builds($locator(${branch}running:false,canceled:false,count:1),build(number,status,statusText)))`;
    // const performanceURL =
    //   'http://ci.mia.ucloud.int/app/rest/buildTypes?locator=affectedProject:(id:NPCAL_NPCALPerformanceTests)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

    const acceptance = checkForFailBuild(acceptanceURL);
    const commit = checkForFailBuild(commitURL);
    // const performance = checkForFailBuild(performanceURL);

    Promise.all([commit, acceptance])
      .then(results => {
        if (results.length > 0) {
          const failedBuilds = [];
          results.forEach(result => {
            result.forEach(r => {
              failedBuilds.push(r);
            });
          });

          resolve(failedBuilds);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

router.route('/').get((req, res) => {
  const branch = req.query.branch;
  let getBuilds;

  if (branch) {
    getBuilds = getLatestBuilds(`branch:name:${branch},`);
  } else {
    getBuilds = getLatestBuilds('');
  }

  Promise.all([getBuilds]).then(results => {
    res.status(200).json(results[0]);
  });
});

module.exports = router;
