import db from '../../models';
import * as Error from '../error.dal';

function findAll() {
  return new Promise((resolve, reject) => {
    db.Product.findAll()
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
    db.Product.findById(id)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    db.Product.create(product)
      .then(obj => {
        resolve(obj);
      })
      .catch(err => {
        Error.create({
          type: err.message,
          message: err.errors[0].message,
          path: err.errors[0].value,
          status: 'SQL FAIL',
          other: 'products',
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
  create,
  findAll,
  findById,
};
