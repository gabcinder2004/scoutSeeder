import db from '../../models';

function upsert(values, condition) {
  return new Promise((resolve, reject) => {
    db.Feature.findOne({ where: condition })
      .then(obj => {
        if (obj) {
          resolve(obj.update(values));
        }
        resolve(db.Feature.create(values));
      })
      .catch(err => {
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
        console.log(err);
        reject(err);
      });
  });
}


function findOneById(id) {
  return new Promise(resolve => {
    db.Feature.findOne({ where: { id } }).then(obj => {
      resolve(obj);
    });
  });
}

module.exports = {
  upsert,
  create,
  findOneById,
};
