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

export async function sequelizeTryConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "\nConnection at database has been established successfully.\n"
    );
    await sequelize.sync({ force: true });
    console.log("\nThe models were created!\n");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
