import db from '../../models';
import * as Error from '../error.dal';

function findAll() {
  return new Promise((resolve, reject) => {
    db.Feature.findAll()
      .then(results => {
        resolve(results);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.Feature.findById(id)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function findByReleaseId(releaseId) {
  return new Promise((resolve, reject) => {
    db.Feature.findAll({
      where: { ReleaseId: releaseId },
    })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function create(feature) {
  return new Promise((resolve, reject) => {
    db.Feature.create(feature)
      .then(obj => {
        resolve(obj);
      })
      .catch(err => {
        let obj = {};
        if (err.errors) {
          obj = {
            type: err.message,
            message: err.errors[0].message,
            path: err.errors[0].value,
            status: 'SQL FAIL',
            other: 'features',
          };
        } else {
          obj = {
            status: 'SQL FAIL',
            other: 'features',
            message: err.sqlMessage,
          };
        }

        console.log(err);

        Error.create(obj)
          .then(() => {
            reject();
          })
          .catch(e => {
            console.log(e);
            reject();
          });
      });
  });
}

module.exports = {
  findAll,
  findById,
  findByReleaseId,
  create,
};
