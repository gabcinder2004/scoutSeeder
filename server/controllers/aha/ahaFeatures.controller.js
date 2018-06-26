import * as DAL from '../../dataAccess/';

export function getAll(req, res) {
  DAL.Aha.Feature.findAll().then(savedFeatures => {
    res.status(200).json(savedFeatures);
  });
}

export function get(req, res) {
  DAL.Aha.Feature.findById(req.params.id)
    .then(feature => {
      DAL.Jira.Issue.findByFeatureId(parseInt(req.params.id, 10))
        .then(issues => {
          res.status(200).json({ feature, issues });
        })
        .catch(err => {
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}
