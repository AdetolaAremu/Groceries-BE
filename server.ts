import "dotenv/config";

import app from "./index";
import runDbMigrations from "./db/migrations/runmigration";
import seedData from "./db/migrations/seeds/ProductSeeder";
import { updateEnvFile } from "./utils/FileWriter";

async function start() {
  const migrationCompleted = process.env.MIGRATION_COMPLETED === "true";

  if (!migrationCompleted) {
    await runDbMigrations();

    await seedData(); // seed 20 product data

    updateEnvFile(); // once a migration has ran before, don't seed again and set migration completed to true
  }

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`😎😇 Running on port ${port} 😇😎`);
  });
}

start();
