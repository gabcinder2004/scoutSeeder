import db from '../../models';

function upsert(values, condition) {
  return new Promise((resolve, reject) => {
    db.Release.findOne({ where: condition })
      .then(obj => {
        if (obj) {
          resolve(obj.update(values));
        }
        resolve(db.Release.create(values));
      })
      .catch(err => {
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
        console.log(release.owner);
        reject(err);
      });
  });
}

function findOneById(id) {
  return new Promise(resolve => {
    db.Release.findOne({ where: { id } }).then(obj => {
      resolve(obj);
    });
  });
}

module.exports = {
  upsert,
  create,
  findOneById,
};
