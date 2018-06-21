import axios from 'axios';

import * as cfController from './jiraCustomFields.controller';
import * as issueController from './jiraIssues.controller';

import * as Error from '../../dataAccess/error.dal';

export const JIRA_URL = 'http://ultidev/rest/api/2';

export function queryJira(url, ref) {
  return new Promise((resolve, reject) => {
    var auth = new Buffer(process.env.JU + ':' + process.env.JP).toString(
      'base64'
    );

    axios(`${url}`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        Error.create({
          type: 'JIRA_FAIL',
          status: err.response.status,
          message: err.response.statusText,
          path: err.request.path,
          other: ref
        });
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
