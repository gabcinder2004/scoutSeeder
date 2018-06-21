import db from '../../models';
import * as Error from '../error.dal';

function create(issue) {
  return new Promise((resolve, reject) => {
    db.Issue.create(issue)
      .then(obj => {
        resolve(obj);
      })
      .catch(err => {
        Error.create(
          {
            type: err.message,
            message: err.errors[0].message,
            path: err.errors[0].value,
            status: 'SQL FAIL',
            other: 'issues',
          }
        )
          .then(() => {
            reject(err);
          })
          .catch(e => {
            console.log(e);
            reject(e);
          });
      });
  });
}

module.exports = {
  create,
};
