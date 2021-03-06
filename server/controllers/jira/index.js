import axios from 'axios';
import config from '../../config';
export function queryJira(url, ref) {
  return new Promise((resolve, reject) => {
    var auth = new Buffer(
      config.jira_user + ':' + config.jira_pass
    ).toString('base64');

    axios(`${url}`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  queryJira: queryJira
};
