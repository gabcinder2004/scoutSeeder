const redisConfig = { redis: { port: 6379, host: 'localhost' } };
const kue = require('kue');
let queue;

import * as processor from './jobs.processor';

export function initialize() {
  queue = kue.createQueue(redisConfig);

  queue.on('ready', () => {
    console.info('Queue is ready!');
  });

  queue.on('failed', err => {
    console.error('There was an error in the main queue!');
    console.error(err);
    console.error(err.stack);
  });

  queue.on('complete', () => {
    console.info('Job complete');
  }); 

  processor.enableAllJobProcessing();
}

module.exports = { initialize };
