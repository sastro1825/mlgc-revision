const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../services/loadModel');
const { postPredictHandler, predictHistories } = require('../server/handler');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
  });

  // Load model
  const model = await loadModel();
  server.app.model = model; // Store the model in server context

  // Register routes
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init().catch((err) => {
  console.log(err);
  process.exit(1);
}); 