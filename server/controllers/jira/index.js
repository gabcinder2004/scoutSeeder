import axios from 'axios';

import * as cfController from './jiraCustomFields.controller';
import * as issueController from './jiraIssues.controller';

export const JIRA_URL = 'http://ultidev/rest/api/2';

export function queryJira(url) {
  return new Promise((resolve, reject) => {
    var auth = new Buffer(process.env.JU + ':' + process.env.JP).toString('base64');

    axios(`${url}`, {
        headers:
        {
            'Authorization': `Basic ${auth}`
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.response.data.errorMessages);
        reject(err);
      });
  });
}

module.exports = {
  CustomFields: cfController,
  Issues: issueController,
  queryJira: queryJira,
  JIRA_URL: JIRA_URL
};
