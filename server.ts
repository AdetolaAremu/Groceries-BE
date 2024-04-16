import 'dotenv/config';

import app from './index';
import runDbMigrations from './db/migrations/runmigration';

async function start() {
  await runDbMigrations();

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`😎😇 Running on port ${port} 😇😎`);
  });
}

start();