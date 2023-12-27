import { Sequelize, DataTypes } from "sequelize";
import { db_host, db_name, db_user, db_password, db_port } from "./config.js";

const environment = process.env.NODE_ENV || "DEV";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: db_host,
  database: db_name,
  username: db_user,
  password: db_password,
  port: db_port,
  logging: environment !== "TEST",
});

export async function connectDB() {
  try {
    console.log("DATABASE NAME--------",db_name,"---------DATABASE USERNAME",db_user)
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");

    await sequelize.sync();

    if(environment != "TEST"){
      await executeStoredProcedures();
      console.log("✅ Stored procedures executed successfully.");

    }

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function closeConnection() {
  sequelize
    .close()
    .then(() => {
      console.log("✅ Sequelize connection closed.");
    })
    .catch((error) => {
      console.error("Error closing Sequelize connection:", error);
    });
}

export async function executeStoredProcedures() {
  try {
    const dropProcedures = [
      "DROP PROCEDURE IF EXISTS usp_ins_product;",
      "DROP PROCEDURE IF EXISTS usp_get_product;",
      "DROP PROCEDURE IF EXISTS usp_list_product;",
      "DROP PROCEDURE IF EXISTS usp_upd_product;",
      "DROP PROCEDURE IF EXISTS usp_del_product;",
    ];

    for (const dropProcedure of dropProcedures) {
      await sequelize.query(dropProcedure);
    }

    const createProcedures = [
      `
      CREATE PROCEDURE usp_ins_product(IN name VARCHAR(255), IN description TEXT, IN price INT)
      BEGIN
          INSERT INTO products (name, description, price) VALUES (name, description, price);
      END;
      `,
      `
      CREATE PROCEDURE usp_get_product(IN product_id INT)
      BEGIN
          SELECT * FROM products WHERE id = product_id;
      END;
      `,
      `
      CREATE PROCEDURE usp_list_product()
      BEGIN
          SELECT * FROM products;
      END;
      `,
      `
      CREATE PROCEDURE usp_upd_product(IN product_id INT, IN name VARCHAR(255), IN description TEXT, IN price INT)
      BEGIN
          UPDATE products SET name = name, description = description, price = price WHERE id = product_id;
      END;
      `,
      `
      CREATE PROCEDURE usp_del_product(IN product_id INT)
      BEGIN
          DELETE FROM products WHERE id = product_id;
      END;
      `,
    ];

    for (const createProcedure of createProcedures) {
      await sequelize.query(createProcedure);
    }
  } catch (error) {
    console.error("Error executing stored procedures:", error);
  }
}

export { sequelize, DataTypes };

export default sequelize;
