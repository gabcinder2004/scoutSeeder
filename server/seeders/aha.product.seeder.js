import * as DAL from '../dataAccess';
import * as AhaController from '../controllers/aha';
import * as queueNames from '../util/queueNames';

const kue = require('kue');
const queue = kue.createQueue();

const _ = require('lodash');

function getDetailedProduct(product) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(`${AhaController.API_URL}/products/${product.id}`)
      .then(data => {
        resolve(data.product);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(`${AhaController.API_URL}/products?per_page=100`)
      .then(data => {
        resolve(data.products);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getAllProducts,
  getDetailedProduct,
};
