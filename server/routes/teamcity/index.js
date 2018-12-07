import { Router } from 'express';
const v10builds = require('./v10builds.routes');
const v14builds = require('./v14builds.routes');

const router = new Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.use('/v10/builds', v10builds);
router.use('/v14/builds', v14builds);

module.exports = router;
