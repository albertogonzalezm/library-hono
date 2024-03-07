import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";
import Books from "./book-schema";

class Authors extends Model {}
Authors.init(
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
    modelName: "Authors",
    timestamps: false,
    freezeTableName: true,
  }
);

Authors.hasMany(Books, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

Books.belongsTo(Authors, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

export default Authors;
