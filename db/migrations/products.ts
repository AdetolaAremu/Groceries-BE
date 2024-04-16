const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    barcode VARCHAR(12) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT true,
    quantity INT NOT NULL
  );
`;

export default createProductsTable;