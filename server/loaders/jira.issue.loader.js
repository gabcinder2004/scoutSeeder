import * as JiraController from '../controllers/jira';

function cleanObject(i, f) {
  return {
    key: i.key,
    summary: i.fields.summary,
    status: i.fields.status ? i.fields.status.name : null,
    priority: i.fields.priority ? i.fields.priority.name : null,
    type: i.fields.issuetype ? i.fields.issuetype.name : null,
    fixVersion:
      i.fields.fixVersions && i.fields.fixVersions.length > 0
        ? i.fields.fixVersions[0].name
        : null,
    resolution: i.fields.resolution ? i.fields.resolution.name : null,
    assignee: i.fields.assignee ? i.fields.assignee.displayName : null,
    createdBy: i.fields.creator ? i.fields.creator.displayName : null,
    reporter: i.fields.reporter ? i.fields.reporter.displayName : null,
    FeatureId: f.id,
  };
}

const getIssuesByAhaName = (feature, release) => {
  return new Promise((resolve, reject) => {
    let jql = '';
    if (new Date(release.release_date) < new Date(2018, 5, 1)) {
      jql = encodeURIComponent(`'Aha Id' = '${feature.name.trim()} [# ${feature.ref}]'`);
    } else {
      jql = encodeURIComponent(`'Epic Link' = '${feature.name}'`);
    }

    JiraController.queryJira(
      `${JiraController.JIRA_URL}/search?jql=${jql}&&maxResults=200`, feature.ref
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
  //   const jql = new Buffer(`'Epic Link' = ${name}`).toString('base64');
};

module.exports = { getIssuesByAhaName, cleanObject };
