import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "libraryhono", // database
  "root", // user
  "1234", // password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export async function sequelizeSync() {
  try {
    await sequelize.sync({ force: true });
    console.log("\nAll models were synchronized successfully.\n");
  } catch (error) {
    console.error("\nsynchronization was unsuccessful\n", error);
  }
}

export async function sequelizeAutenticate() {
  try {
    await sequelize.authenticate();
    console.log("\nConnection has been established successfully.\n");
  } catch (error) {
    console.error("\nUnable to connect to the database:\n", error);
  }
}

export default sequelize;
