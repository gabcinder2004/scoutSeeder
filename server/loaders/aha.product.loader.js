import * as AhaController from '../controllers/aha';

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
