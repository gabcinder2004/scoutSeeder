import db from '../../models';

function create(issue) {
  return new Promise((resolve, reject) => {
    db.Issue.create(issue)
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
  create,
  findOneById,
};
