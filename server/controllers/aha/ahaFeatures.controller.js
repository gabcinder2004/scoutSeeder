import { queryAha, API_URL } from './';
import * as DAL from '../../dataAccess';
import * as time from '../../util/time';

export function getBasicFeaturesByReleases(req, res) {
  DAL.Aha.Feature.getAllByReleaseId(req.query.release)
    .then(features => {
      if (!features || features.length === 0) {
        queryAha(
          `${API_URL}/releases/${req.query.release}/features?per_page=200`
        )
          .then(data => {
            DAL.Aha.Feature.upsert(req.query.release, data.features)
              .then(p => {
                res.status(200).json(p);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ err: `Error: ${err}` });
              });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      } else {
        res.status(200).json(features);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: `Error: ${err}` });
    });
}

export function getDetailedFeaturesById(req, res) {
  DAL.Aha.Feature.findById(req.params.id).then(feature => {
    if (
      !feature ||
      !feature._changedDate ||
      time.diffByDays(new Date(), feature._changedDate) >= 1
    ) {
      queryAha(`${API_URL}/features/${req.params.id}`)
        .then(response => {
          DAL.Aha.Feature.upsertDetailedFeature(response.feature)
            .then(p => {
              res.status(200).json(p);
            })
            .catch(err => {
              res.status(500).json({ err: `Error: ${err}` });
            });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(200).json(feature);
    }
  });
}

export function getDetailedFeaturesByRefNum(req, res) {
  DAL.Aha.Feature.findByRefNum(req.query.ref).then(feature => {
    if (
      !feature ||
      !feature._changedDate ||
      time.diffByDays(new Date(), feature._changedDate) >= 1
    ) {
      queryAha(`${API_URL}/features/${req.query.ref}`)
        .then(response => {
          DAL.Aha.Feature.upsertDetailedFeature(response.feature)
            .then(p => {
              res.status(200).json(p);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ err });
            });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(200).json(feature);
    }
  });
}
