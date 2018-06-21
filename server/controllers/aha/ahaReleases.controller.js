import * as DAL from '../../dataAccess/';

export function getAll(req, res) {
  DAL.Aha.Release.findAll().then(releases => {
    res.status(200).json(releases);
  });
}

export function get(req, res) {
  DAL.Aha.Release.findById(req.params.id)
    .then(release => {
      DAL.Aha.Feature.findByReleaseId(parseInt(req.params.id, 10))
        .then(features => {
          res.status(200).json({ release, features });
        })
        .catch(err => {
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}
