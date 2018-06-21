import db from '../../models';
import * as Error from '../error.dal';

function findAll() {
  return new Promise((resolve, reject) => {
    db.Release.findAll()
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
    db.Release.findAll({ where: { id } })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function findByProductId(productId) {
  return new Promise((resolve, reject) => {
    db.Release.findAll({
      where: { ProductId: productId },
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

function create(release) {
  return new Promise((resolve, reject) => {
    db.Release.create(release)
      .then(obj => {
        resolve(obj);
      })
      .catch(err => {
        console.log(err);
        Error.create({
          type: err.message,
          message: err.errors[0].message,
          path: err.errors[0].value,
          status: 'SQL FAIL',
          other: 'releases',
        })
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
  findByProductId,
  create,
};
