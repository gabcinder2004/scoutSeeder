import * as AhaController from '../controllers/aha';

function cleanReleaseObject(r, product) {
  return {
    id: r.id,
    name: r.name,
    reference_num: r.reference_num,
    start_date: r.start_date,
    release_date: r.release_date,
    dev_start_date: r.development_started_on,
    owner: r.owner.name,
    createdBy: r.created_by_user.name,
    // productId: r.product_id,
    status: r.workflow_status.name,
    created_at: r.created_at,
    updated_at: r.updated_at,
    released: r.released,
    original_estimate: r.original_estimate,
    remaining_estimate: r.remaining_estimate,
    work_units: r.work_units,
    work_done: r.work_done,
    ProductId: product.id,
  };
}

function getDetailedRelease(releaseId) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(`${AhaController.API_URL}/releases/${releaseId}`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getAllReleasesForProduct(product) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(
      `${AhaController.API_URL}/products/${product.id}/releases`
    )
      .then(data => {
        resolve(data.releases);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getAllReleasesForProduct,
  getDetailedRelease,
  cleanReleaseObject,
};
