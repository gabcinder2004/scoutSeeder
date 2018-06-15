// // import * as cfDAL from '../../dataAccess/jira/custom_field.dal';
// import * as ahaFeatureDAL from '../../dataAccess/aha/feature.dal';
// import * as issueDAL from '../../dataAccess/jira/issue.dal';

// import { queryJira, JIRA_URL } from './';

// export function getIssuesByAhaFeatureId(req, res) {
//   ahaFeatureDAL.findById(req.query.featureid).then(result => {
//     const jql = `"Aha Id"="${result.feature.name} [# ${result.feature.reference_num}]"`;
//     const encodedJql = encodeURIComponent(jql);
//     queryJira(`${JIRA_URL}/search?jql=${encodedJql}`)
//     .then(r => {
//       const issues = r.issues;
//       issueDAL.createMany(issues)
//       .then(docs => { res.status(200).json({ issues: docs }); })
//       .catch(err => { res.status(500).json({ err }); });
//     })
//     .catch(err => {
//       res.status(500).json({ err });
//     });
//   });
// }
// // import * as cfDAL from '../../dataAccess/jira/custom_field.dal';
// import * as ahaFeatureDAL from '../../dataAccess/aha/feature.dal';
// import * as issueDAL from '../../dataAccess/jira/issue.dal';

// import { queryJira, JIRA_URL } from './';

// export function getIssuesByAhaFeatureId(req, res) {
//   ahaFeatureDAL.findById(req.query.featureid).then(result => {
//     const jql = `"Aha Id"="${result.feature.name} [# ${result.feature.reference_num}]"`;
//     const encodedJql = encodeURIComponent(jql);
//     queryJira(`${JIRA_URL}/search?jql=${encodedJql}`)
//     .then(r => {
//       const issues = r.issues;
//       issueDAL.createMany(issues)
//       .then(docs => { res.status(200).json({ issues: docs }); })
//       .catch(err => { res.status(500).json({ err }); });
//     })
//     .catch(err => {
//       res.status(500).json({ err });
//     });
//   });
// }
