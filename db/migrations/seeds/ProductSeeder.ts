import db from "../../index";
import { faker } from "@faker-js/faker";

async function seedData() {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    for (let i = 1; i <= 20; i++) {
      const barcode = faker.number.bigInt({
        min: 100000000000,
        max: 999999999999,
      });
      const brand = faker.company.name();
      const productName = faker.commerce.productName();
      const status = true;
      const quantity = 100;

      await client.query(
        "INSERT INTO products (barcode, brand, product_name, status, quantity) VALUES ($1, $2, $3, $4, $5)",
        [barcode, brand, productName, status, quantity]
      );
    }

    await client.query("COMMIT");
    console.log("Data seeded successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error seeding data:", error);
  } finally {
    client.release();
  }
}

export default seedData;
