const kue = require('kue');
const queue = kue.createQueue();
const _ = require('lodash');

import * as DAL from '../dataAccess';
import * as Seeder from '../seeders';
import * as queueNames from '../util/queueNames';
import * as config from '../config';

export function processAhaJobsFromQueue() {
  const maxRequestLimit = 250;
  let requestsMade = 0;
  let timeout = 100;

  const checkRequestsCount = j => {
    if (requestsMade > maxRequestLimit) {
      timeout = 120000;
      requestsMade = 0;

      console.log(`[${j.type}] Waiting ${timeout / 1000} seconds`);
      return;
    }
  };

  // PRODUCTS
  queue.process(queueNames.list_products, (j, done) => {
    requestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(`[#${requestsMade}][${j.type}] Processing all products`);
      timeout = 100;

      Seeder.AhaProduct.getAllProducts()
        .then(products => {
          const filteredProducts = _.filter(products, product => {
            return _.includes(config.aha_whitelist.products, product.id);
          });
          return filteredProducts;
        })
        .then(filteredProducts => {
          _.forEach(filteredProducts, p => {
            queue.create(queueNames.seed_products, { product: p }).save();
          });
          done();
        })
        .catch(err => {
          throw err;
        });
    }, timeout);
  });

  queue.process(queueNames.seed_products, (j, done) => {
    requestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${requestsMade}][${j.type}] Processing product: ${j.data.product.name}`
      );
      timeout = 100;
      Seeder.AhaProduct.getDetailedProduct(j.data.product).then(p => {
        DAL.Aha.Product.create(p).then(saved_product => {
          queue.create(queueNames.list_releases, { product: p }).save();
          done();
        });
      });
    }, timeout);
  });

  // RELEASES

  queue.process(queueNames.list_releases, (j, done) => {
    requestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${requestsMade}][${j.type}] Processing releases for ${
          j.data.product.name
        }`
      );
      timeout = 100;

      Seeder.AhaRelease.getAllReleasesForProduct(j.data.product)
        .then((releases) => {
          const filteredReleases = _.filter(releases, release => {
            return _.includes(config.aha_whitelist.releases, release.id);
          });
          return filteredReleases;
        })
        .then(filteredReleases => {
          _.forEach(filteredReleases, r => {
            queue.create(queueNames.seed_releases, { release: r, product: j.data.product }).save();
          });
          done();
        })
        .catch(err => {
          done(err);
        });
    }, timeout);
  });

  queue.process(queueNames.seed_releases, (j, done) => {
    requestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${requestsMade}][${j.type}] Seeding release: ${j.data.release.name}`
      );
      timeout = 100;

      Seeder.AhaRelease.getDetailedRelease(j.data.release.id).then(data => {
        DAL.Aha.Release.create(
          Seeder.AhaRelease.cleanReleaseObject(data.release, j.data.product)
        )
          .then(s => {
            queue
              .create(queueNames.list_features, { release: data.release })
              .save();
            done();
          })
          .catch(err => {
            console.log(err);
            done(err);
          });
      });
    }, timeout);
  });

  // FEATURES
  queue.process(queueNames.list_features, (j, done) => {
    requestsMade++;

    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${requestsMade}][${j.type}] Processing features for ${
          j.data.release.name
        }`
      );
      timeout = 100;

      Seeder.AhaFeature.createDetailedFeatureJobs(j.data.release)
        .then(features => {
          _.forEach(features, feature => {
            queue.create(queueNames.seed_features, { feature, release: j.data.release }).save();
          });
          done();
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    }, timeout);
  });

  queue.process(queueNames.seed_features, (j, done) => {
    requestsMade++;

    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${requestsMade}][${j.type}] Processing ${j.data.feature.name}`
      );
      timeout = 100;

      Seeder.AhaFeature.getDetailedFeature(j.data.feature.id)
        .then(data => {
          DAL.Aha.Feature.create(
            Seeder.AhaFeature.cleanFeatureObject(data.feature, j.data.release)
          )
            .then(savedFeature => {
              done();
            })
            .catch(err => {
              console.log(err);
              done(err);
            });
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    }, timeout);
  });
}

export function enableAllJobProcessing() {
  processAhaJobsFromQueue();
}
