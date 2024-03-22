import { Sequelize } from "sequelize";

const database = process.env.MYSQL_DB;
const user = process.env.MYSQL_USER;
const passwd = process.env.MYSQL_PASSWD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
  database, // database
  user, // user
  passwd, // password
  {
    host,
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
