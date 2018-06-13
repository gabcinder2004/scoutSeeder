import * as DAL from '../../dataAccess/';
import { queryAha, API_URL } from './';
import * as time from '../../util/time';
const _ = require('lodash');

function updateProducts(data, res) {
  const promises = [];

  _.forEach(data.products, product => {
    promises.push(DAL.Aha.Product.upsert(product, { id: product.id }));
  });

  Promise.all(promises)
    .then(values => {
      res.status(200).json(values);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function upsertProduct(product, res) {
  DAL.Aha.Product.upsert(product, { id: product.id })
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

export function getBasicProducts(req, res) {
  DAL.Aha.Product.findAll().then(savedProducts => {
    if (savedProducts.length === 0) {
     //
    } else {
      res.status(200).json(savedProducts);
    }
  });
}

export function getDetailedProductById(req, res) {
  DAL.Aha.Product.getById(req.params.id)
    .then(result => {
      if (
        !result ||
        !result.product.default_capacity_units ||
        time.diffByDays(new Date(), result._changedDate) >= 1
      ) {
        queryAha(`${API_URL}/products/${req.params.id}`)
          .then(data => {
            upsertProduct(data.product, res);
          })
          .catch(err => {
            console.log('getProducts: error');
            console.log(err);
            res.status(500).json({ err });
          });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
}
