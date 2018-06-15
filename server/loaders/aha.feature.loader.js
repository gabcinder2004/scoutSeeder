import * as AhaController from '../controllers/aha';
const _ = require('lodash');

function cleanFeatureObject(f, r) {
  let devTeam;
  let internalId;
  let complianceScore;
  // console.log(f);

  _.forEach(f.custom_fields, field => {
    switch (field.name) {
      case 'Dev Team':
        devTeam = field.value[0];
        break;
      case 'Compliance Advisory Score':
        complianceScore = field.value;
        break;
      case 'Internal ID':
        if (field.value === '') {
          internalId = -1;
        } else {
          internalId = field.value;
        }
        break;
      default:
        console.log(
          `Custom field used that is not being tracked: ${field.name}`
        );
        break;
    }
  });

  let assignedTo = '';
  if (f.assigned_to_user && f.assigned_to_user.name) {
    assignedTo = f.assigned_to_user.name;
  }

  return {
    id: f.id,
    name: f.name,
    type: f.workflow_kind.name,
    status: f.workflow_status.name,
    reference_num: f.reference_num,
    owner: assignedTo,
    createdBy: f.created_by_user.name,
    start_date: f.start_date,
    due_date: f.due_date,
    created_at: f.created_at,
    updated_at: f.updated_at,
    original_estimate: f.original_estimate,
    remaining_estimate: f.remaining_estimate,
    work_units: f.work_units,
    work_done: f.work_done,
    use_requirements_estimate: f.use_requirements_estimates,
    dev_team: devTeam,
    compliance_score: complianceScore,
    internal_id: internalId,
    tags: f.tags,
    ReleaseId: r.id,
  };
}

function getDetailedFeature(featureId) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(`${AhaController.API_URL}/features/${featureId}`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createDetailedFeatureJobs(release) {
  return new Promise((resolve, reject) => {
    AhaController.queryAha(
      `${AhaController.API_URL}/releases/${release.id}/features?per_page=200`
    )
      .then(data => {
        resolve(data.features);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  createDetailedFeatureJobs,
  getDetailedFeature,
  cleanFeatureObject,
};
