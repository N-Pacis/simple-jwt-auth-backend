import {
    connectDB,
    closeConnection,
    executeStoredProcedures,
    sequelize,
  } from "../../../src/utils/database";
  
  beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await closeConnection();
  });
  
  describe("Database Utility Functions", () => {
    describe("connect to database", () => {
      test("should connect to the database", async () => {
        expect(sequelize).toBeDefined();
        const [results] = await sequelize.query("SHOW TABLES");
        const tableNames = results.map((result) => result[`Tables_in_${sequelize.config.database}`]);        
  
        expect(tableNames.includes("products")).toBe(true);
        expect(tableNames.includes("users")).toBe(true);
      });
    });
  
    describe("executeStoredProcedures", () => {
      test("should execute stored procedures", async () => {
        await executeStoredProcedures();
        const [results] = await sequelize.query("SHOW PROCEDURE STATUS");
        const procedureNames = results.map((result) => result.Name);
  
        const expectedProcedureNames = [
          "usp_ins_product",
          "usp_get_product",
          "usp_list_product",
          "usp_upd_product",
          "usp_del_product",
        ];
  
        for (const expectedName of expectedProcedureNames) {
          expect(procedureNames.includes(expectedName)).toBe(true);
        }
      });
    });
  
  });
  