import * as JiraController from '../controllers/jira';

function cleanObject(i) {
  return {
    id: i.key,
    summary: i.fields.summary,
    status: i.fields.status ? i.fields.status.name : null,
    priority: i.fields.priority ? i.fields.priority.name : null,
    type: i.fields.issuetype ? i.fields.issuetype.name : null,
    fixVersion: i.fields.fixVersions && i.fields.fixVersions.length > 0 ? i.fields.fixVersions[0].name : null,
    resolution: i.fields.resolution ? i.fields.resolution.name : null,
    assignee: i.fields.assignee ? i.fields.assignee.displayName : null,
    createdBy: i.fields.creator ? i.fields.creator.displayName : null,
    reporter: i.fields.reporter ? i.fields.reporter.displayName : null,
  };
}


const getIssuesByAhaName = name => {
  return new Promise((resolve, reject) => {
    const jql = encodeURIComponent(`'Epic Link' = '${name}'`);

    JiraController.queryJira(`${JiraController.JIRA_URL}/search?jql=${jql}&&maxResults=200`)
      .then(issues => {
        resolve(issues);
      })
      .catch(err => {
        reject(err);
      });
  });
  //   const jql = new Buffer(`'Epic Link' = ${name}`).toString('base64');
};

module.exports = { getIssuesByAhaName, cleanObject };
