import { queryAha, API_URL } from './';
import * as DAL from '../../dataAccess/';
import * as time from '../../util/time';

export function getBasicReleasesByProduct(req, res) {
  DAL.Aha.Release.getAllByProductId(req.query.product)
    .then(releases => {
      if (!releases || releases.length === 0) {
        DAL.Aha.Release.upsertReleasesForProduct(
          req.query.product,
          data.releases
        )
          .then(p => {
            res.status(200).json(p);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ err });
          });
      } else {
        res.status(200).json(releases);
      }
    })
    .catch(err => {
      res.status(500).json({ err: `Error: ${err}` });
    });
}

export function getDetailedReleasesByReleaseId(req, res) {
  DAL.Aha.Release.findById(req.params.id).then(release => {
    if (
      !release ||
      !release._changedDate ||
      time.diffByDays(new Date(), release._changedDate) >= 1
    ) {
      queryAha(`${API_URL}/releases/${req.params.id}`)
        .then(data => {
          DAL.Aha.Release.upsertDetailedReleaseById(
            data.release.id,
            data.release
          )
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
      res.status(200).json(release);
    }
  });
}
