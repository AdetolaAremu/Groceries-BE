import fs from "fs";

export const updateEnvFile = () => {
  fs.readFile(".env", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading .env file:", err);
      return;
    }

    const updatedData = data.replace(
      "MIGRATION_COMPLETED=false",
      "MIGRATION_COMPLETED=true"
    );

    fs.writeFile(".env", updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to .env file:", err);
        return;
      }
      console.log(".env file updated successfully");
    });
  });
};
