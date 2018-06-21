import * as Aha from './aha';
import * as Jira from './jira';
import * as Error from './error.dal';
import db from '../models';

const dropDB = () => {
  return new Promise((resolve, reject) => {
    db.sequelize.query('drop database scout;').then(() => {
      db.sequelize.query('create schema scout;').then(() => {
        resolve();
      });
    });
  });
};

module.exports = {
  Aha,
  Jira,
  Error,
  dropDB
};
