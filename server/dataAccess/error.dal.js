import db from '../models';

function cleanUpError(error, table) {
  return {
    name: error.message,
    message: error.errors[0].message,
    reference: error.errors[0].value,
    table,
  };
}

function create(error) {
  return new Promise((resolve, reject) => {
    // const e = cleanUpError(error, table);

    db.Error
      .create(error)
      .then(obj => {
        console.log('[ERROR SAVED TO DATABASE]');
        resolve(obj);
      })
      .catch(err => {
        console.log('error creating error?');
        reject(err);
      });
  });
}

module.exports = {
  create,
};
