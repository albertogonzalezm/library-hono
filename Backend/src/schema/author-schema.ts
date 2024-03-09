import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";

class Author extends Model {}
Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Author",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Author;
