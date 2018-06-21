import * as AhaController from '../controllers/aha';

function cleanObject(p) {
  return {
    key: p.id,
    name: p.name,
    reference_prefix: p.reference_prefix,
    product_line: p.product_line,
    created_at: p.created_at,
    description: p.description.body,
  };
}


function getDetailedProduct(product) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(`${AhaController.API_URL}/products/${product.id}`)
      .then(data => {
        resolve(cleanObject(data.product));
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
  cleanObject,
};
