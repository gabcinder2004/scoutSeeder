import db from '../../models';

function upsert(values, condition) {
  return new Promise((resolve, reject) => {
    db.Product.findOne({ where: condition })
      .then(obj => {
        if (obj) {
          resolve(obj.update(values));
        }
        resolve(db.Product.create(values));
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
        reject(err);
      });
  });
}

function findAll() {
  return new Promise(resolve => {
    db.Product.findAll().then(obj => {
      resolve(obj);
    });
  });
}

function findOneById(id) {
  return new Promise(resolve => {
    db.Product.findOne({ where: { id } }).then(obj => {
      resolve(obj);
    });
  });
}

module.exports = {
  upsert,
  create,
  findOneById,
  findAll,
};
