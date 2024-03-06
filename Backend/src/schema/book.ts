import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config";

class Book extends Model {}
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publicactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "book",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Book;
