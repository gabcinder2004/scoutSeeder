import axios from 'axios';

export function queryTeamcity(url, ref) {
  return new Promise((resolve, reject) => {
    var auth = new Buffer(process.env.JIRA_USER + ':' + process.env.JIRA_PASS).toString(
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
        reject(err);
      });
  });
}

module.exports = {
  queryTeamcity: queryTeamcity,
};
