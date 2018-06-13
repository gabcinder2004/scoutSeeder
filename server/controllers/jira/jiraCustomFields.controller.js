// import * as cfDAL from '../../dataAccess/jira/custom_field.dal';
// import { queryJira, JIRA_URL } from './';

// export function upsertCustomFields(req, res) {
//   cfDAL.removeAllDocuments().then(() => {
//     queryJira(`${JIRA_URL}/field`)
//     .then(fields => {
//       cfDAL.createMany(fields)
//       .then(docs => { res.status(200).json({ docs }); })
//       .catch(err => { res.status(500).json({ err }); });
//     })
//     .catch(err => {
//       res.status(500).json({ err });
//     });
//   });
// }
