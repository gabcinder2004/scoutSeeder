import * as productLoader from './aha.product.loader';
import * as releaseLoader from './aha.release.loader';
import * as featureLoader from './aha.feature.loader';
import * as jiraLoader from './jira.issue.loader';
import * as queueNames from '../util/queueNames';

const kue = require('kue');
const queue = kue.createQueue();
const _ = require('lodash');

export function seedAll() {
  // Enqueue jobs for seeding products
  queue.create(queueNames.list_products, {}).save(err => {
    if(err){
      console.log('err');
    }
    console.log(`[${queueNames.list_products}] Created`);
  });
}

export function clearTables() {}

module.exports = {
  seedAll,
  AhaProduct: productLoader,
  AhaRelease: releaseLoader,
  AhaFeature: featureLoader,
  Issues: jiraLoader
};
