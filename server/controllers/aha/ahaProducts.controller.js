import * as DAL from '../../dataAccess/';
import { queryAha, API_URL } from './';
import * as time from '../../util/time';
const _ = require('lodash');

export function getAll(req, res) {
  DAL.Aha.Product.findAll().then(savedProducts => {
    res.status(200).json(savedProducts);
  });
}

export function get(req, res) {
  DAL.Aha.Product.findById(req.params.id)
    .then(product => {
      DAL.Aha.Release.findByProductId(parseInt(req.params.id, 10))
        .then(releases => {
          res.status(200).json({ product, releases });
        })
        .catch(err => {
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}
