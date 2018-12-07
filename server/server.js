import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Initialize the Express App
const app = new Express();

// Import required modules
import serverRoutes from './routes/';

import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', serverRoutes);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// start app
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(
      `Scout is running on: ${serverConfig.port}!`
    ); // eslint-disable-line
  }
});

export default app;
