import * as ProductSeeder from './aha.product.seeder';
import * as ReleaseSeeder from './aha.release.seeder';
import * as FeatureSeeder from './aha.feature.seeder';
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

  // Process jobs for seeding products

  // Enqueue jobs for seeding releases

  // Process jobs for seeding releases

  // ProductSeeder.seed()
  //   .then(products => {
  //     console.log('********** Seeded Products successfully **********');
  //     return _.find(products, { name: 'Tax Compliance' });
  //   })
  //   .then(p => {
  //     return ReleaseSeeder.seed(p);
  //   })
  //   .then(releases => {
  //     console.log('********** Seeded Releases successfully **********');
  //     var queueName = 'ahaFeaturesByRelease';
  //     _.forEach(releases, r => {
  //       queue.create(queueName, { release: r }).save(e => {
  //         if (e) {
  //           console.log(err);
  //           return;
  //         }
  //         console.log(`Enqueued job for: ${queueName}`);
  //       });
  //     });
  //   })
  //   .then(features => {
  //     console.log('********** Seeded Features successfully **********');
  //   })
  //   .catch(err => {
  //     console.log('------------ Seeding Failed! -------------');
  //     console.log(err);
  //   });
}

export function clearTables() {}

module.exports = {
  seedAll,
  AhaProduct: ProductSeeder,
  AhaRelease: ReleaseSeeder,
  AhaFeature: FeatureSeeder
};
