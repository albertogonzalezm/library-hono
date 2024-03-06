import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";
import Book from "./book-schema";

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
    tableName: "author",
    timestamps: false,
    freezeTableName: true,
  }
);

Author.hasMany(Book, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

Book.belongsTo(Author, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

export default Author;
