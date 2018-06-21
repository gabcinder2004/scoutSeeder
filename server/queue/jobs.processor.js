const kue = require('kue');
const queue = kue.createQueue();
const _ = require('lodash');

import * as DAL from '../dataAccess';
import * as Loader from '../loaders';
import * as queueNames from '../util/queueNames';
import * as config from '../config';

export function processAhaJobsFromQueue() {
  const ahaMaxRequestLimit = 250;
  const jiraMaxRequestLimit = 500;
  let ahaRequestsMade = 0;
  let jiraRequestsMade = 0;
  let ahaTimeout = 100;
  let jiraTimeout = 100;

  const checkRequestsCount = j => {
    if (ahaRequestsMade > ahaMaxRequestLimit) {
      ahaTimeout = 120000;
      ahaRequestsMade = 0;

      console.log(`[AHA] Waiting ${ahaTimeout / 1000} seconds`);
      return;
    }

    if (jiraRequestsMade > jiraMaxRequestLimit) {
      jiraTimeout = 300000;
      jiraRequestsMade = 0;
      console.log(`[JIRA] Waiting ${jiraTimeout / 1000} seconds`);
      return;
    }
  };

  // PRODUCTS
  queue.process(queueNames.list_products, (j, done) => {
    ahaRequestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(`[#${ahaRequestsMade}][${j.type}] Processing all products`);
      ahaTimeout = 100;

      Loader.AhaProduct.getAllProducts()
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
    }, ahaTimeout);
  });

  queue.process(queueNames.seed_products, (j, done) => {
    ahaRequestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${ahaRequestsMade}][${j.type}] Processing product: ${
          j.data.product.name
        }`
      );
      ahaTimeout = 100;
      Loader.AhaProduct.getDetailedProduct(j.data.product).then(p => {
        DAL.Aha.Product.create(p).then((sp) => {
          // console.log(sp);
          queue.create(queueNames.list_releases, { product: sp }).save();
          done();
        });
      });
    }, ahaTimeout);
  });

  // RELEASES

  queue.process(queueNames.list_releases, (j, done) => {
    ahaRequestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${ahaRequestsMade}][${j.type}] Processing releases for ${
          j.data.product.name
        }`
      );
      ahaTimeout = 100;
      console.log(j.data.product);
      Loader.AhaRelease.getAllReleasesForProduct(j.data.product)
        .then(releases => {
          const filteredReleases = _.filter(releases, release => {
            return _.includes(config.aha_whitelist.releases, release.id);
          });
          return filteredReleases;
        })
        .then(filteredReleases => {
          _.forEach(filteredReleases, r => {
            queue
              .create(queueNames.seed_releases, {
                release: r,
                product: j.data.product,
              })
              .save();
          });
          done();
        })
        .catch(err => {
          done(err);
        });
    }, ahaTimeout);
  });

  queue.process(queueNames.seed_releases, (j, done) => {
    ahaRequestsMade++;
    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${ahaRequestsMade}][${j.type}] Seeding release: ${
          j.data.release.name
        }`
      );
      ahaTimeout = 100;

      Loader.AhaRelease.getDetailedRelease(j.data.release.id).then(data => {
        DAL.Aha.Release.create(
          Loader.AhaRelease.cleanReleaseObject(data.release, j.data.product)
        )
          .then((sr) => {
            queue
              .create(queueNames.list_features, { release: sr })
              .save();
            done();
          })
          .catch(err => {
            done(err);
          });
      });
    }, ahaTimeout);
  });

  // FEATURES
  queue.process(queueNames.list_features, (j, done) => {
    ahaRequestsMade++;

    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${ahaRequestsMade}][${j.type}] Processing features for ${
          j.data.release.name
        }`
      );
      ahaTimeout = 100;

      Loader.AhaFeature.createDetailedFeatureJobs(j.data.release)
        .then(features => {
          _.forEach(features, feature => {
            queue
              .create(queueNames.seed_features, {
                feature,
                release: j.data.release,
              })
              .save();
          });
          done();
        })
        .catch(err => {
          done(err);
        });
    }, ahaTimeout);
  });

  queue.process(queueNames.seed_features, (j, done) => {
    ahaRequestsMade++;

    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${ahaRequestsMade}][${j.type}] Processing ${j.data.feature.name}`
      );
      ahaTimeout = 100;

      Loader.AhaFeature.getDetailedFeature(j.data.feature.id)
        .then(data => {
          DAL.Aha.Feature.create(
            Loader.AhaFeature.cleanFeatureObject(data.feature, j.data.release)
          )
            .then((sf) => {
              queue
                .create(queueNames.query_issues, { feature: sf, release: j.data.release })
                .save();
              done();
            })
            .catch(err => {
              // console.log(err);
              done(err);
            });
        })
        .catch(err => {
          done(err);
        });
    }, ahaTimeout);
  });

  queue.process(queueNames.query_issues, (j, done) => {
    jiraRequestsMade++;

    checkRequestsCount(j);

    setTimeout(() => {
      console.log(
        `[#${jiraRequestsMade}][${j.type}] Processing ${j.data.feature.name}`
      );
      jiraTimeout = 100;

      Loader.Issues.getIssuesByAhaName(j.data.feature, j.data.release)
        .then(data => {
          _.forEach(data.issues, issue => {
            DAL.Jira.Issue.create(Loader.Issues.cleanObject(issue, j.data.feature))
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
          });
          done();
        })
        .catch(err => {
          done(err);
        });
    }, jiraTimeout);
  });
}

export function enableAllJobProcessing() {
  processAhaJobsFromQueue();
}
